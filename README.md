# AI Scribe Notes Manager - Setup Guide

A full-stack medical note-taking application with AI-powered transcription and summarization.

## Watch the demo video 🎥 
[![Watch the demo](https://vumbnail.com/1128735883.jpg)](https://vimeo.com/1128735883)




## 🔧 Prerequisites & Environment Setup

### 1. Install Prerequisites
- Docker and Docker Compose
- Git

### 2. Clone Repository
```bash
git clone <repository-url>
cd lime-ai-challenge
```

### 3. Environment Variables Setup

**Root directory** - Create `.env` (for Docker Compose):
```env
GOOGLE_API_KEY="your-gemini-api-key"
```

**Backend** - Create `backend/.env` if you want to run only the backend:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/lime?schema=public"
GOOGLE_API_KEY="your-gemini-api-key"
```

**Frontend** - Create `frontend/.env` if you want to run only the frontend:
```env
VITE_API_URL="http://localhost:3000/api"
```

**⚠️ Important**: You need to get a free Google Gemini API key:
1. Go to https://makersuite.google.com/app/apikey
2. Create a free API key
3. Replace `"your-gemini-api-key"` in both `.env` files with your actual API key

## 🚀 Start Application

```bash
./start.sh
```

This will automatically:
- Build and start all services
- Run database migrations
- Seed the database with mock patients
- Start the application

**Access URLs:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Database: localhost:5432

## 🛠️ Development Commands

```bash
# Start all services
docker-compose up --build

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Access containers
docker-compose exec backend sh
docker-compose exec frontend sh
docker-compose exec postgres psql -U postgres -d lime

# Database operations
docker-compose exec backend npx prisma migrate dev
docker-compose exec backend npx prisma studio
```

## 🐛 Troubleshooting

**Port already in use:**
```bash
lsof -i :3000  # Check what's using the port
```

**Database connection issues:**
```bash
docker-compose exec postgres pg_isready -U postgres -d lime
```

**Clean rebuild:**
```bash
docker-compose down -v
docker-compose up --build
```
