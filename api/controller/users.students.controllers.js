import { createToken } from '../services/auth.js';
import studentUser from '../models/students.model.js';

export function userStudentLogin(req, res) {
    const userData = { userName: req.body.userName };
    const token = createToken(userData);
    res.json({ token });
}
export async function userStudentRegister(req, res) {
    const newUser = await studentUser.create({ ...req.body });
    console.log(newUser);
    res.json(newUser);
}
