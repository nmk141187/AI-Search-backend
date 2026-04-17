import express from 'express';
import {router} from './routes';
import { errorHandler} from './shared/middleware/error-handler';   
import { notFoundHandler } from './shared/middleware/not-found';
import cors from 'cors';


export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use(notFoundHandler);
app.use(errorHandler);
