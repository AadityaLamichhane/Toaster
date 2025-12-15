#  APi for Toaster application 

A comprehensive backend API for toaster web services built with Elysia framework and Bun runtime.

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Set up environment variables
cp .env.example .env

# Run database migrations
bun run db:push

# Seed database (optional)
bun run seed

# Start development server
bun run dev
```

Server runs on http://localhost:3000

### Base URL
```
http://localhost:3000/api
```

### Main Modules
- **About Us** - Introduction, staff, director messages
- **Acts & Directives** - Legal documents, regulations, procedures
- **Contact Us** - Office contacts and information
- **Media Centre** - News, publications, photo gallery
- **Info & Downloads** - Public information and downloadable resources
- **Training & Programs** - Educational content and programs

### Authentication
- JWT-based authentication for admin operations
- Public read access for most endpoints
- Admin permissions required for POST/PUT/DELETE operations

## 📁 Project Structure

```
src/
├── config/          # Database and server configuration
├── middleware/      # Authentication middleware
├── modules/         # Feature modules (controllers, models, validation)
├── routes/          # API route definitions
├── utils/           # Helper functions and utilities
└── migrations/      # Database schema and migrations
```

## 🗄️ Database

Uses PostgreSQL with Drizzle ORM for type-safe database operations.

### Available Scripts


```bash
bun run db:generate  # Generate migrations
bun run db:push      # Push schema to database
bun run seed         # Seed database with sample data
```

## 🔧 Tech Stack

- **Runtime**: Bun
- **Framework**: Elysia
- **Database**: PostgreSQL
- **ORM**: Drizzle
- **Validation**: Joi
- **Authentication**: JWT

## 📋 Environment Variables

Create a `.env` file with:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/toaster
JWT_SECRET=your-secret-key
PORT=3000

```

## 🔐 Admin Access

Admin routes are protected and require authentication headers:
```
Authorization: Bearer <jwt-token>
```
