import express from 'express';
import {
    // addFavorites,
    getAllStudents,
    getStudent,
    deleteStudent,
    userStudentRegister,
} from '../controller/users.students.controllers.js';
import { userStudentLogin } from '../controller/login.student.controller.js';

const router = express.Router();

router.post('/login', userStudentLogin);
router.post('/register', userStudentRegister);
router.get('/', getAllStudents);
router.get('/:id', getStudent);
router.delete('/:id', deleteStudent);
// router.patch('/:id/favorites/teacher/', addFavorites);
// router.delete('/:id', deleteStudent);
export default router;
