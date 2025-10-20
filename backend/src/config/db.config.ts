import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const testConnection = async () => {
  try {
    await prisma.$connect()
    console.log('Connection to PostgreSQL with Prisma successful')
  } catch (err) {
    console.error('Error connecting to PostgreSQL:', err)
    throw new Error(`Error connecting to PostgreSQL: ${err}`)
  }
}

export default prisma