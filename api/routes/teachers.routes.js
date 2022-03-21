import express from 'express';
import {
    deleteTeacher,
    getAllTeachers,
    getTeacher,
    userTeacherRegister,
    classesBooked,
} from '../controller/users.teachers.controller.js';
import { reviewOfTeacher } from '../controller/reviews.teacher.controller.js';

import { userTeacherLogin } from '../controller/login.teacher.controller.js';
import { addFavorites } from '../controller/users.teachers.controller.js';
import { loginRequired } from '../middleware/login.control.js';
const router = express.Router();

router.post('/login', userTeacherLogin);
router.post('/register', userTeacherRegister);
router.get('/', getAllTeachers);
router.get('/:id', getTeacher);
router.delete('/:id', deleteTeacher);
router.patch('/:id/favorites', loginRequired, addFavorites);
router.patch('/:id/myclasses', classesBooked);
router.patch('/:id/review', reviewOfTeacher);

export default router;
