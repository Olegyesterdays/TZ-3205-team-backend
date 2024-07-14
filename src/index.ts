import 'dotenv/config';
import express, { Application } from 'express';
import cors from 'cors';
import userRouter from './routes/routes-user';

const app: Application = express();
const PORT = process.env.PORT_APP;

app.use(express.json());
app.use(cors());
app.use('/api/users', userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
