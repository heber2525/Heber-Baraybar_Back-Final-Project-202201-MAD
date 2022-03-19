import { createToken } from '../services/auth.js';
import bcrypt from 'bcryptjs';
import studentUser from '../models/students.model.js';

export const userStudentLogin = async (req, resp, next) => {
    const user = req.body;
    console.log(user);
    if (!user.name || !user.password) {
        next(new Error('user or password not found'));
    } else {
        const userFound = await studentUser.findOne({
            name: user.name,
        });
        if (!userFound) {
            next(new Error('User or password not found'));
        } else if (!bcrypt.compareSync(user.password, userFound.password)) {
            next(new Error('Password not found'));
        } else {
            const token = createToken({
                name: userFound.name,
                id: userFound._id,
            });
            resp.json({
                token,
                userName: userFound.name,
                id: userFound._id,
            });
        }
    }
};
