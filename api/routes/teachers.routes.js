import express from 'express';
import {
    userTeacherLogin,
    userTeacherRegister,
} from '../controller/users.teachers.controller.js';

const router = express.Router();

router.post('/login', userTeacherLogin);
router.post('/register', userTeacherRegister);

export default router;
