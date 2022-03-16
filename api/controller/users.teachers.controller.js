import { createToken } from '../services/auth.js';
import teacherUser from '../models/teachers.model.js';

export async function userTeacherRegister(req, res) {
    const newUser = await teacherUser.create({ ...req.body });
    res.json({ ...newUser });
}

export const getAllTeachers = async (req, res, next) => {
    try {
        const resp = await teacherUser.find({});
        if (resp === null) {
            const error = new Error('No data');
            error.status = 204;
            next(error);
        }
        res.json(resp);
    } catch (err) {
        next((err, 'error get allTeachers 404'));
    }
};

export const getTeacher = async (req, res, next) => {
    try {
        const resp = await teacherUser.findById(req.params.id);

        if (res === null) {
            const error = new Error('No data');
            error.status = 204;
            next(error);
        }
        res.json(resp);
    } catch (err) {
        next((err, 'error get Teacher 404'));
    }
};
export const deleteTeacher = async (req, res, next) => {
    try {
        const resp = await teacherUser.findByIdAndDelete(req.params.id);

        if (res === null) {
            const error = new Error('No teachers to delete');
            error.status = 204;
            next(error);
        }
        res.json(resp);
    } catch (err) {
        next(err);
    }
};
