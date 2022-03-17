import studentUser from '../models/students.model.js';
import bcrypt from 'bcryptjs';

export async function userStudentRegister(req, res) {
    const encryptedPassword = bcrypt.hashSync(req.body.password);
    const newUser = await studentUser.create({
        ...req.body,
        password: encryptedPassword,
    });
    console.log(newUser, 'newUser register');
    res.json(newUser);
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
        if (res === null) {
            const error = new Error('No data');
            error.status = 204;
            next(error);
        }
        res.json(resp);
    } catch (err) {
        next(err);
    }
};
export const deleteStudent = async (req, res, next) => {
    try {
        const resp = await studentUser.findByIdAndDelete(req.params.id);

        if (res === null) {
            const error = new Error('No students to delete');
            error.status = 204;
            next(error);
        }
        res.json(resp);
    } catch (err) {
        next(err);
    }
};
// export const updateStudent = (req, res, next) => {
//     crud.updateStudent(req.params.id, req.body, teacherUser).then((resp) => {
//         res.json(resp);
//     });
// };

// export async function addFavorites(req, res, next) {
//     return await crud.findByIdAndUpdate(id, partialTask, { new: true });
// }
// export const deleteStudent = (req, res, next) => {
//     deleteStudent(req.params.id, req.body, studentUser).then((res) => {
//         res.json(resp);
//     });
// };
// export async function deleteTask(id, Task) => { return await Task.findByIdAndDelete(id).populate('responsible', {
//         tasks: 0,
//     });
