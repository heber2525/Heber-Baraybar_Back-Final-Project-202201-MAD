import { createToken } from '../services/auth.js';
import bcrypt from 'bcryptjs';
import teacherUser from '../models/teachers.model.js';

export const userTeacherLogin = async (req, resp, next) => {
    const user = req.body;

    if (!user.name || !user.password) {
        next(new Error('teacher or password not found'));
    } else {
        const userFound = await teacherUser.findOne({
            name: user.name,
        });

        if (!userFound) {
            next(new Error('teacher not found'));
        } else if (!bcrypt.compareSync(user.password, userFound.password)) {
            next(new Error('Invalid password'));
        } else {
            const token = createToken({
                name: userFound.name,
                id: userFound.id,
            });
            resp.json({
                token,
                userName: userFound.name,
                id: userFound.id,
            });
        }
    }
};
