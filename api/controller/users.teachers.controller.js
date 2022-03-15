import { createToken } from '../services/auth.js';
import teacherUser from '../models/teachers.model.js';

export function userTeacherLogin(req, res) {
    const userData = { userName: req.body.userName };
    const token = createToken(userData);
    res.json({ token });
}
export async function userTeacherRegister(req, res) {
    const newUser = await teacherUser.create({ ...req.body });
    res.json({ ...newUser });
}
