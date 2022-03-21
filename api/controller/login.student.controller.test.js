import bcrypt from 'bcryptjs';
import { userCreator } from '../models/students.model.js';
import { userStudentLogin } from './login.student.controller.js';
import { createToken } from '../services/auth.js';

jest.mock('../models/students.model.js');
jest.mock('../services/auth.js');
jest.mock('bcryptjs');

describe('Given the function userStudentLogin', () => {
    const userStudent = { findOne: jest.fn() };
    const req = {};
    const res = {};
    const next = jest.fn();
    beforeAll(async () => {
        res.json = jest.fn();
        userCreator.mockReturnValue(userStudent);
        createToken.mockReturnValue('2525252');
    });
    describe('When the user is registered and the password is correct', () => {
        req.body = {
            userName: userStudent.userName,
            password: userStudent.password,
        };
        userStudent.findOne.mockResolvedValue({
            _doc: {
                _id: ObjectId('234fbc1776919ae3984c70'),
                userName: 'Heber',
                password: 'Y4FVcGcDFV1S1Abcy2WcH6',
                birthDate: '2022-02-27',
                image: 'asjkflgsa',
            },
        });
        test('Then resp.json shuld be called', async () => {
            bcrypt.compareSync.mockReturnValue(true);
            await userLogin(req, res, next);
            expect(res.json).toHaveBeenCalled();
        });
    });
    describe('When the user is registered but password is incorrect', () => {
        req.body = { ...mockUser, password: '' };
        userStudent.findOne.mockResolvedValue({
            _doc: {
                _id: ObjectId('62234fbc1776919ae3984c70'),
                userName: 'pepito',
                password:
                    '$2a$10$bkpEjjw65nNTqmBq2aA8RuvgwAzcjtSY4FVcGcDFV1S1Abcy2WcH6',
                birthDate: '2022-02-27',
                image: 'asjkflgsa',
            },
        });
        test('Then it should call next', async () => {
            bcrypt.compareSync.mockReturnValue(false);
            await userStudentLogin(req, res, next);
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When the user is not registered', () => {
        test('Then it should call next', async () => {
            req.body = { ...mockUser, password: '' };
            userStudent.findOne.mockResolvedValue(null);
            await userLogin(req, res, next);
            expect(next).toHaveBeenCalled();
        });
    });
});
