# Tic-Tac-Toe Game Application

## Overview

This is a full-stack TypeScript application featuring a Tic-Tac-Toe game with AI opponents. The application is built using a modern React frontend with Vite, a Node.js/Express backend, and PostgreSQL database with Drizzle ORM. The UI is styled using Tailwind CSS and shadcn/ui components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React hooks and TanStack Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Style**: RESTful API with `/api` prefix
- **Development**: tsx for TypeScript execution in development

### Database & ORM
- **Database**: PostgreSQL (configured for Neon Database)
- **ORM**: Drizzle ORM with TypeScript-first approach
- **Migrations**: Drizzle Kit for schema management
- **Schema**: Located in `shared/schema.ts` for type sharing

## Key Components

### Game Logic
- **Tic-Tac-Toe Engine**: Complete game implementation with AI opponents
- **Difficulty Levels**: Easy, Medium, and Hard AI strategies
- **Game State Management**: React hooks for board state and game flow
- **Score Tracking**: Persistent score tracking across games

### Storage Layer
- **Abstract Interface**: `IStorage` interface for CRUD operations
- **Memory Storage**: `MemStorage` class for development/testing
- **Database Ready**: Prepared for PostgreSQL integration via Drizzle
- **User Management**: Basic user schema with username/password

### UI Framework
- **Component Library**: shadcn/ui with Radix UI primitives
- **Design System**: Consistent theming with CSS variables
- **Responsive Design**: Mobile-first approach with Tailwind
- **Dark Mode**: Built-in theme switching capability

## Data Flow

### Frontend to Backend
1. API requests use fetch with credentials for session management
2. TanStack Query handles caching and synchronization
3. Error handling with toast notifications
4. Type-safe API calls with shared TypeScript types

### Game State Flow
1. User actions update local React state
2. AI moves calculated based on difficulty setting
3. Game outcome determination and score updates
4. Persistent storage of user progress and statistics

### Database Integration
1. Drizzle schema defines PostgreSQL tables
2. Type-safe database operations with Drizzle ORM
3. Migration system for schema evolution
4. Connection pooling via Neon Database serverless

## External Dependencies

### Core Technologies
- **@neondatabase/serverless**: PostgreSQL serverless driver
- **drizzle-orm**: Type-safe ORM with PostgreSQL dialect
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight React router

### UI Dependencies
- **@radix-ui/***: Accessible UI primitive components
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Tools
- **vite**: Fast build tool and dev server
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite bundles React app to `dist/public`
2. **Backend Build**: esbuild bundles Express server to `dist/index.js`
3. **Database**: Drizzle migrations applied before deployment

### Environment Configuration
- **Development**: Hot reload with Vite dev server proxy
- **Production**: Static file serving with Express
- **Database**: Environment variable configuration for connection strings

### Hosting Considerations
- **Serverless Ready**: Compatible with platforms like Vercel, Netlify
- **Docker Ready**: Can be containerized for traditional hosting
- **Database**: Designed for Neon Database but works with any PostgreSQL instance

The application follows a monorepo structure with clear separation between client, server, and shared code, making it maintainable and scalable for future enhancements.