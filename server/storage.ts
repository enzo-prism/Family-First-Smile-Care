import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import {
  contacts,
  users,
  type Contact,
  type InsertContact,
  type InsertUser,
  type User,
} from "@shared/schema";
import { db } from "./db";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact): Promise<Contact>;
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
}

const drizzleDb = db;

export const storage: IStorage = drizzleDb
  ? new DatabaseStorage(drizzleDb)
  : new InMemoryStorage();
