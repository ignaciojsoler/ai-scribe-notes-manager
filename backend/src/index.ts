import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors())

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`)
})