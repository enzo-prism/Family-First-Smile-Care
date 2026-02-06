import { randomUUID } from "crypto";
import { desc, eq, ilike, or, sql } from "drizzle-orm";
import {
  contacts,
  users,
  type Contact,
  type InsertContact,
  type InsertUser,
  type User,
} from "@shared/schema";
import { db } from "./db";

type ListContactsOptions = {
  limit: number;
  offset: number;
  q?: string;
};

export type ListContactsResult = {
  total: number;
  items: Contact[];
};

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact): Promise<Contact>;
  listContacts(options: ListContactsOptions): Promise<ListContactsResult>;
}

type DrizzleDatabase = NonNullable<typeof db>;

export class DatabaseStorage implements IStorage {
  constructor(private readonly database: DrizzleDatabase) {}

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await this.database
      .select()
      .from(users)
      .where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await this.database
      .select()
      .from(users)
      .where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await this.database.insert(users).values(insertUser).returning();
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await this.database
      .insert(contacts)
      .values(insertContact)
      .returning();
    return contact;
  }

  async listContacts(options: ListContactsOptions): Promise<ListContactsResult> {
    const q = options.q?.trim();
    const pattern = q ? `%${q}%` : null;
    const where = pattern
      ? or(
          ilike(contacts.firstName, pattern),
          ilike(contacts.lastName, pattern),
          ilike(contacts.email, pattern),
          ilike(contacts.phone, pattern),
          ilike(contacts.service, pattern),
          ilike(contacts.message, pattern),
        )
      : undefined;

    const [countRow] = await this.database
      .select({ count: sql<number>`count(*)` })
      .from(contacts)
      .where(where);

    const items = await this.database
      .select()
      .from(contacts)
      .where(where)
      .orderBy(desc(contacts.createdAt))
      .limit(options.limit)
      .offset(options.offset);

    return {
      total: Number(countRow?.count ?? 0),
      items,
    };
  }
}

class InMemoryStorage implements IStorage {
  private readonly users = new Map<string, User>();
  private readonly contacts = new Map<string, Contact>();

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      id: randomUUID(),
      ...insertUser,
    };
    this.users.set(user.id, user);
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const contact: Contact = {
      id: randomUUID(),
      createdAt: new Date(),
      firstName: insertContact.firstName,
      lastName: insertContact.lastName,
      email: insertContact.email,
      phone: insertContact.phone ?? null,
      service: insertContact.service ?? null,
      message: insertContact.message ?? null,
    };
    this.contacts.set(contact.id, contact);
    return contact;
  }

  async listContacts(options: ListContactsOptions): Promise<ListContactsResult> {
    const q = options.q?.trim().toLowerCase() || "";
    const matches = (contact: Contact) => {
      if (!q) return true;
      const haystack = [
        contact.firstName,
        contact.lastName,
        contact.email,
        contact.phone,
        contact.service,
        contact.message,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    };

    const all = Array.from(this.contacts.values())
      .filter(matches)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    const items = all.slice(options.offset, options.offset + options.limit);
    return { total: all.length, items };
  }
}

const drizzleDb = db;

export const storage: IStorage = drizzleDb
  ? new DatabaseStorage(drizzleDb)
  : new InMemoryStorage();
