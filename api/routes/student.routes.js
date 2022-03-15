import express from 'express';
import {
    userStudentLogin,
    userStudentRegister,
} from '../controller/users.students.controllers.js';

const router = express.Router();

router.post('/login', userStudentLogin);
router.post('/register', userStudentRegister);

export default router;
