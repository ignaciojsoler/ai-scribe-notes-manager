# Backend Setup

## Prerequisites
- Node.js and npm installed
- Docker and Docker Compose installed

## Setup Instructions

1. **Start the database services**
   ```bash
   docker compose up -d
   ```

2. **Generate Prisma client**
   ```bash
   npx prisma generate
   ```

3. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
