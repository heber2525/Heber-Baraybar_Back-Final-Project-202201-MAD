import * as controller from './login.student.controller';
import bcrypt from 'bcryptjs';
import { createToken } from '../services/auth.js';
import studentUser from '../models/students.model.js';

jest.mock('../models/students.model.js');
jest.mock('bcryptjs');
jest.mock('../services/auth.js');

describe('Given the student controller', () => {
    let req;
    let res;
    let next;
    beforeEach(() => {
        req = { params: {} };
        res = {};
        res.send = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        res.status = jest.fn().mockReturnValue(res);
        next = jest.fn();
    });

    describe('When login is triggered', () => {
        describe('And there are not user name ', () => {
            test('Then call next', async () => {
                req.body = { name: 'Heber' };
                await controller.userStudentLogin(req, res, next);
                expect(res.json).not.toHaveBeenCalled();
                expect(next).toHaveBeenCalled();
            });
        });
        describe('And there are not passwd', () => {
            test('Then call next ', async () => {
                req.body = { passwd: '1234' };
                await controller.userStudentLogin(req, res, next);
                expect(res.json).not.toHaveBeenCalled();
                expect(next).toHaveBeenCalled();
            });
        });

        describe('And there are user name or password', () => {
            beforeEach(() => {
                req.body = { name: 'Heber', password: '1234' };
            });

            describe('And the studentUser name is not found', () => {
                test('Then call next', async () => {
                    studentUser.findOne = jest.fn().mockResolvedValue(null);
                    await controller.userStudentLogin(req, res, next);
                    expect(next).toHaveBeenCalled();
                });
            });

            describe('And the password is not correct', () => {
                test('Then call next', async () => {
                    studentUser.findOne = jest.fn().mockResolvedValue({});
                    bcrypt.compareSync.mockReturnValue(null);
                    await controller.userStudentLogin(req, res, next);
                    expect(next).toHaveBeenCalled();
                });
            });

            describe('And the user name and password are ok', () => {
                test('Then call send', async () => {
                    const student = {
                        name: 'Heber',
                        id: '1',
                    };
                    studentUser.findOne = jest.fn().mockResolvedValue(student);
                    bcrypt.compareSync.mockReturnValue(true);
                    createToken.mockReturnValue('mock_token');
                    await controller.userStudentLogin(req, res, next);
                    expect(res.json).toHaveBeenCalledWith({
                        userName: 'Heber',
                        id: '1',
                        token: 'mock_token',
                    });
                });
            });
        });
    });
});
