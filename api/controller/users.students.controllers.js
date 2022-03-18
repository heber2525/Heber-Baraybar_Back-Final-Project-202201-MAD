import studentUser from '../models/students.model.js';
import bcrypt from 'bcryptjs';

export async function userStudentRegister(req, res, next) {
    try {
        const encryptedPassword = bcrypt.hashSync(req.body.password);
        const newUser = await studentUser.create({
            ...req.body,
            password: encryptedPassword,
        });
        console.log(await studentUser.create({}));
        res.json(newUser);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

export const getAllStudents = async (req, res, next) => {
    try {
        const resp = await studentUser.find({});
        // .populate('languages', 'favorites');
        if (resp === null) {
            const error = new Error('No data');
            error.status = 204;
            next(error);
        }
        res.json(resp);
    } catch (err) {
        next((err, 'error get all 404'));
    }
};

export const getStudent = async (req, res, next) => {
    try {
        const resp = await studentUser.findById(req.params.id);
        // .populate('favorites', 'languages');
        if (resp === null) {
            const error = new Error('No data');
            error.status = 204;
            next(error);
        }
        res.json(resp);
    } catch (err) {
        console.log(err);
        next(err);
    }
};
export const deleteStudent = async (req, res, next) => {
    try {
        const resp = await studentUser.findByIdAndDelete(req.params.id);

        if (resp === null) {
            const error = new Error('No students to delete');
            error.status = 204;
            next(error);
        }
        res.json(resp);
    } catch (err) {
        next(err);
    }
};
