import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './app/config/routes';
import globalErrorHandler from './app/config/middleware/globalErrorHandler';
import cookieParser from 'cookie-parser';
import notFound from './app/config/middleware/notFound';

const app: Application = express();

//parsers
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173'],
  }),
);
app.use(cookieParser());

// application routes
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Messaging App Project</h1>');
});

//Not Found
app.use(notFound);
app.use(globalErrorHandler);

export default app;