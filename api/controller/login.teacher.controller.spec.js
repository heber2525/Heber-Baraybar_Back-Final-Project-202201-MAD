import * as controller from './login.teacher.controller';
import bcrypt from 'bcryptjs';
import { createToken } from '../services/auth.js';
import teacherUser from '../models/teachers.model.js';

jest.mock('../models/teachers.model.js');
jest.mock('bcryptjs');
jest.mock('../services/auth.js');

describe('Given the teacher controller', () => {
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
                await controller.userTeacherLogin(req, res, next);
                expect(res.json).not.toHaveBeenCalled();
                expect(next).toHaveBeenCalled();
            });
        });
        describe('And there are not passwd', () => {
            test('Then call next ', async () => {
                req.body = { password: '1234' };
                await controller.userTeacherLogin(req, res, next);
                expect(res.json).not.toHaveBeenCalled();
                expect(next).toHaveBeenCalled();
            });
        });

        describe('And there are user name or password', () => {
            beforeEach(() => {
                req.body = { name: 'Heber', password: '1234' };
            });

            describe('And the teacher name is not found', () => {
                test('Then call next', async () => {
                    teacherUser.findOne = jest.fn().mockResolvedValue(null);
                    await controller.userTeacherLogin(req, res, next);
                    expect(next).toHaveBeenCalled();
                });
            });

            describe('And the password is not correct', () => {
                test('Then call next', async () => {
                    teacherUser.findOne = jest.fn().mockResolvedValue({});
                    bcrypt.compareSync.mockReturnValue(null);
                    await controller.userTeacherLogin(req, res, next);
                    expect(next).toHaveBeenCalled();
                });
            });

            describe('And the user name and password are ok', () => {
                test('Then call send', async () => {
                    const teacher = {
                        name: 'Heber',
                        id: '1',
                    };
                    teacherUser.findOne = jest.fn().mockResolvedValue(teacher);
                    bcrypt.compareSync.mockReturnValue(true);
                    createToken.mockReturnValue('mock_token');
                    await controller.userTeacherLogin(req, res, next);
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
