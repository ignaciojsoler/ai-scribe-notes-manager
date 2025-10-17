import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { testConnection } from './config/db';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors())

app.listen(PORT, async () => {
  await testConnection();
  console.log(`Server is running on port ${PORT}`)
})