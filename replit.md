# Family First Smile Care - Dental Practice Website

## Overview

This is a modern, family-oriented dental practice website built for Family First Smile Care in Los Gatos, CA. The application features a React frontend with TypeScript, shadcn/ui components, and an Express.js backend with PostgreSQL database integration using Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

- **January 31, 2025**: Added PostgreSQL database with contact form functionality - contact submissions now stored in database with full validation and error handling
- **January 31, 2025**: Replaced gradient placeholders with authentic Vimeo videos - hero section shows office tour, about page shows patient experience
- **January 31, 2025**: Integrated authentic Google reviews from real patients - replaced stock testimonials with 10 actual patient reviews
- **January 31, 2025**: Updated all appointment booking buttons to open Typeform booking system instead of contact page
- **January 31, 2025**: Updated office hours display to Monday-Thursday 9AM-5PM, Friday closed format
- **January 31, 2025**: Removed patient forms section from Patient Info page while maintaining seamless 2-column design
- **January 31, 2025**: Added custom favicon using Family First Smile Care logo for all website pages, plus enhanced SEO meta tags and Open Graph properties
- **January 31, 2025**: Replaced generic smile icon with authentic Family First Smile Care logo (colorful puzzle piece design) in header and footer
- **January 31, 2025**: Added Google review CTA buttons in footer and dedicated home page section with 5-star visual appeal (removed from navigation header per user request)
- **January 31, 2025**: Integrated YouTube office tour video showcasing the actual Los Gatos location front entrance in the About page Office Tour section
- **January 31, 2025**: Added online bill pay buttons to navigation header and footer linking to SwipeSimple payment portal that opens in new tab
- **January 31, 2025**: Implemented page-specific SEO with React Helmet - unique title tags and meta descriptions for all pages, plus updated OpenGraph image
- **January 31, 2025**: Added sophisticated scroll animations using Framer Motion with GPU acceleration - includes fade-in, slide, scale, and stagger effects for enhanced user experience
- **January 31, 2025**: Extended scroll animations to About page with animated statistics, mission cards, office tour video, and photo galleries using optimized motion variants
- **January 31, 2025**: Fixed spacing consistency across all pages by implementing proper hero sections with py-20 lg:py-32 padding - now all pages have consistent spacing from navigation menu
- **January 31, 2025**: Added TMJ Treatment as new service option with dedicated page - includes comprehensive treatment information, consultation process, and advanced technology details
- **January 31, 2025**: Restructured services page with complete service offerings - organized 10 services with nested structure including Children's Dentistry, Dental Exams, Dental Hygiene, General & Family Dentistry, Night Guards, Restorative Dentistry (with Invisalign, Teeth Whitening, Dental Crowns as sub-services), and TMJ Treatment
- **January 31, 2025**: Added automatic scroll-to-top functionality - all pages now automatically scroll to the top when first opened or navigated to for improved user experience
- **January 31, 2025**: Replaced YouTube office tour video with new Vimeo video (1106179834) - configured for autoplay, loop, and no player controls for seamless viewing experience

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