import studentUser from '../models/students.model.js';
import teacherUser from '../models/teachers.model.js';
import bcrypt from 'bcryptjs';

export async function userTeacherRegister(req, res, next) {
    try {
        const encryptedPassword = bcrypt.hashSync(req.body.password);
        const newUser = await teacherUser.create({
            ...req.body,
            password: encryptedPassword,
        });
        console.log(await teacherUser.create({}));
        res.json(newUser);
    } catch (err) {
        console.log(err);
        next(err);
    }
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
        const resp = await teacherUser
            .findByIdAndUpdate(req.params.id)
            .populate({
                path: 'review',
                populate: {
                    path: 'TeacherId',
                    select: 'name',
                },
            });

        if (resp === null) {
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

        if (resp === null) {
            const error = new Error('No teachers to delete');
            error.status = 204;
            next(error);
        }
        res.json(resp);
    } catch (err) {
        next(err);
    }
};
export const addFavorites = async (req, res, next) => {
    try {
        let currentUser = await studentUser.findById(req.tokenPayload.userId);

        const currentStudentFavorites = currentUser.favorites.map((element) =>
            element.toString()
        );

        const isInFavorites = currentStudentFavorites.some(
            (elem) => elem === req.params.id
        );

        let updatedStudentFavorites;

        if (isInFavorites) {
            updatedStudentFavorites = await studentUser.findByIdAndUpdate(
                req.tokenPayload.userId,
                {
                    $pull: { favorites: req.params.id },
                },
                { new: true }
            );
        } else {
            updatedStudentFavorites = await studentUser.findByIdAndUpdate(
                req.tokenPayload.userId,
                {
                    $addToSet: { favorites: req.params.id },
                },
                { new: true }
            );
        }

        res.status(200).json(updatedStudentFavorites);
    } catch (err) {
        next(err);
    }
};

export const classesBooked = async (req, res, next) => {
    try {
        let currentUser = await studentUser.findById(req.tokenPayload.userId);
        let currentTeacher = await teacherUser.findById(req.params.id);

        console.log(currentTeacher);

        if (
            currentTeacher.studentBooked.find((idStudent) =>
                idStudent.equals(currentUser._id)
            )
        ) {
            currentTeacher.studentBooked = currentTeacher.studentBooked.filter(
                (idStudent) => !idStudent.equals(currentUser._id)
            );
            console.log(currentTeacher);
        } else {
            currentTeacher.studentBooked.push(currentUser._id);
        }
        await currentTeacher.save();

        res.status(200).json(currentTeacher);
    } catch (err) {
        next(err);
    }
};
