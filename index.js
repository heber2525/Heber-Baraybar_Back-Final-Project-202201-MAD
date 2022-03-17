import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { mongoConnect } from './api/services/db.js';
import { handleListen } from './api/services/helper.js';
import userRoutes from './api/routes/student.routes.js';
import teacherRoutes from './api/routes/teachers.routes.js';

dotenv.config();
mongoConnect();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/user/teacher', teacherRoutes);
app.use('/user/student', userRoutes);

// eslint-disable-next-line no-unused-vars
// app.use((err, req, resp, next) => {
//     resp.status(err.status);
//     resp.json({ error: err.message });
// });

export const server = app.listen(port, () => {
    handleListen(port);
});
