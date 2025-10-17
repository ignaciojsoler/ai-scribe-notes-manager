# Backend Setup

## Prerequisites
- Docker and Docker Compose installed

## Quick Start with Docker

The entire application (backend + database) can be started with a single command:

```bash
docker compose up
```

This will:
- Build the backend application container
- Start PostgreSQL database
- Connect both services via Docker network
- Start the development server with hot reload

## Available Commands

### Start services
```bash
# Start all services
docker compose up

# Start in background (detached mode)
docker compose up -d

# Rebuild and start
docker compose up --build
```

### Stop services
```bash
docker compose down
```

### View logs
```bash
# View all logs
docker compose logs

# View specific service logs
docker compose logs app
docker compose logs postgres
```

## Local Development (Alternative)

If you prefer to run the backend locally:

1. **Start only the database**
   ```bash
   docker compose up postgres -d
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Generate Prisma client**
   ```bash
   npx prisma generate
   ```

4. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## Services

- **Backend API**: http://localhost:3000
- **PostgreSQL**: localhost:5432
  - Database: `lime`
  - Username: `postgres`
  - Password: `postgres`
