import { createToken } from '../services/auth.js';
import bcrypt from 'bcryptjs';
import studentUser from '../models/students.model.js';

export const userStudentLogin = async (req, resp, next) => {
    const user = req.body;

    if (!user.name || !user.password) {
        next(new Error('user or password not found'));
    } else {
        const userFound = await studentUser.findOne({
            name: user.name,
        });
        console.log(userFound.password, 'userfound', user.password);
        if (!userFound) {
            next(new Error('User not found'));
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
