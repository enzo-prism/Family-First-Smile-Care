# Family First Smile Care - Dental Practice Website

## Overview

This is a modern, family-oriented dental practice website built for Family First Smile Care in Los Gatos, CA. The application features a React frontend with TypeScript, shadcn/ui components, and an Express.js backend with PostgreSQL database integration using Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

- **January 31, 2025**: Added online bill pay buttons to navigation header and footer linking to SwipeSimple payment portal that opens in new tab
- **January 31, 2025**: Added comprehensive office photo gallery with 12 authentic images of Family First Smile Care practice, showing actual reception area, treatment rooms, equipment, and exterior branding
- **January 31, 2025**: Updated Dr. Chuang's biography with detailed background information including his Cupertino upbringing, UCSD education, UOP dental school graduation in 2020, and Hawaii residency experience
- **January 31, 2025**: Replaced remaining stock placeholder photos with elegant gradients matching the website's color palette (blues, greens, oranges)
- **January 31, 2025**: Integrated real team photos for Dr. Chuang, dental assistant, and office manager

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: Express sessions with PostgreSQL store
- **Build System**: ESBuild for production builds

### Key Design Decisions

**Monorepo Structure**: The application uses a shared workspace with:
- `client/` - React frontend application
- `server/` - Express.js backend API
- `shared/` - Common TypeScript types and database schema

**Component Library Choice**: shadcn/ui was chosen for its modern design system, accessibility features, and flexibility. It provides a comprehensive set of components built on Radix UI primitives with Tailwind CSS styling.

**Database Architecture**: Drizzle ORM provides type-safe database operations with excellent TypeScript integration. The schema is defined in `shared/schema.ts` for use across both client and server.

**Styling Approach**: Tailwind CSS with CSS custom properties enables consistent theming and responsive design. The color palette is optimized for a dental practice with calming blues and medical whites.

## Key Components

### Frontend Pages
- **Home**: Hero section, services overview, testimonials carousel
- **About**: Practice story, mission/values, team statistics
- **Services**: Interactive service cards with expandable details
- **Team**: Dr. Chuang biography and team information
- **Patient Info**: Forms, FAQs, educational content
- **Contact**: Contact form with validation and office information

### UI Components
- **ServiceCard**: Interactive cards with expandable service details
- **TestimonialCarousel**: Rotating patient testimonials with navigation
- **Header**: Fixed navigation with responsive mobile menu
- **Footer**: Practice information and quick links

### Backend Services
- **Storage Interface**: Abstracted data layer with in-memory implementation
- **Route Registration**: Modular route handling system
- **Development Tools**: Vite integration for hot reloading

## Data Flow

### Client-Side Data Management
- TanStack Query handles API calls and caching
- React Hook Form manages form state and validation
- Zod schemas ensure type safety for form data

### Server-Side Processing
- Express middleware handles request logging and error handling
- Storage interface provides CRUD operations for user data
- Database migrations managed through Drizzle Kit

### Database Schema
Currently implements a basic user system with:
- Users table with ID, username, and password fields
- UUID primary keys with PostgreSQL's gen_random_uuid()
- Zod validation schemas for type safety

## External Dependencies

### Core Libraries
- **React Ecosystem**: React, React DOM, React Hook Form
- **UI Components**: Radix UI primitives, Lucide React icons
- **Styling**: Tailwind CSS, class-variance-authority, clsx
- **Database**: Drizzle ORM, Neon Database serverless driver
- **Validation**: Zod for schema validation
- **Date Handling**: date-fns for date manipulation

### Development Tools
- **Build Tools**: Vite, ESBuild, TypeScript
- **Database Tools**: Drizzle Kit for migrations
- **Development**: tsx for TypeScript execution, Replit integration

### Replit-Specific Features
- Runtime error overlay for development
- Cartographer plugin for enhanced debugging
- Development banner integration

## Deployment Strategy

### Development Environment
- **Local Development**: `npm run dev` starts both client and server with hot reloading
- **Database Management**: `npm run db:push` for schema changes
- **Type Checking**: `npm run check` for TypeScript validation

### Production Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: ESBuild bundles server code to `dist/index.js`
3. **Static Serving**: Express serves built frontend from `dist/public`
4. **Database**: Expects PostgreSQL connection via DATABASE_URL environment variable

### Configuration Requirements
- **Environment Variables**: DATABASE_URL for PostgreSQL connection
- **Node.js**: ES Modules enabled with `"type": "module"`
- **TypeScript**: Configured for both client and server code

The application is designed for deployment on Replit with integrated database provisioning and environment management.