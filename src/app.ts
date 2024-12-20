import express, { Express } from 'express';
import 'reflect-metadata';
import cors from 'cors';
import routes from './routes';
import { connectDB } from './config/database';
import Logger from './shared/logger';
const app: Express = express();

app.use(express.json(), cors());
app.use(express.urlencoded({ extended: true }));
connectDB();
routes(app);

Logger();

export default app;
