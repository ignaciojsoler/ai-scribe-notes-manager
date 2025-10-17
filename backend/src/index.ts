import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { testConnection } from './config/db';
import router from './routes';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.listen(PORT, async () => {
  await testConnection();
  console.log(`Server is running on port ${PORT}`)
});