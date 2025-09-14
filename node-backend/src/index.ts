import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.ts';
import { login, register } from './controllers/authController.ts';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/posts', postRoutes);
app.use('/login', login);
app.use('/register', register);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Node backend running on port ${PORT}`);
});