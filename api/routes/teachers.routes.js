import express from 'express';
import {
    deleteTeacher,
    getAllTeachers,
    getTeacher,
    userTeacherRegister,
} from '../controller/users.teachers.controller.js';
import { userTeacherLogin } from '../controller/login.teacher.controller.js';
const router = express.Router();

router.post('/login', userTeacherLogin);
router.post('/register', userTeacherRegister);
router.get('/', getAllTeachers);
router.get('/:id', getTeacher);
router.delete('/:id', deleteTeacher);

export default router;
