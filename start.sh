#!/bin/bash

# Lime AI Challenge - Docker Startup Script
# This script starts all services (database, backend, frontend) with a single command

set -e

echo "🚀 Starting Lime AI Challenge Application..."
echo "=============================================="
echo ""
echo "WARNING: Make sure you have set your GOOGLE_API_KEY in .env"
echo "   Get your free API key at: https://makersuite.google.com/app/apikey"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose is not installed. Please install docker-compose and try again."
    exit 1
fi

echo "📦 Building and starting all services..."
echo ""

# Build and start all services
docker-compose up --build -d

echo "⏳ Waiting for services to be ready..."
sleep 15

echo "🗄️ Running database migrations..."
docker-compose exec -T backend npx prisma migrate dev --name init || echo "⚠️ Migrations may have already been run"

echo "🌱 Seeding database with mock data..."
docker-compose exec -T backend npm run seed || echo "⚠️ Seed may have already been run"

echo "📊 All services are running in background!"
echo ""
echo "✅ Setup complete! Your application is ready."
echo ""
echo "🌐 Access your application:"
echo "   Frontend: http://localhost:5173"
echo "   Backend API: http://localhost:3000"
echo "   Database: localhost:5432"
echo ""
echo "🔧 Useful commands:"
echo "   View logs: docker-compose logs -f"
echo "   Stop services: docker-compose down"
echo "   Restart: ./start.sh"
