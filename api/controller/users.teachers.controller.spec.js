import studentUser from '../models/students.model.js';
import teacherUser from '../models/teachers.model.js';
import * as controller from './users.teachers.controller.js';

jest.mock('../models/teachers.model.js');
jest.mock('../models/students.model.js');

describe('Given the function userTeacherRegister', () => {
    let mockRequest = {
        params: { id: 'testId' },
        body: { password: '12345' },
        tokenPayload: {},
    };

    let req = mockRequest;
    const res = { json: jest.fn() };
    const next = jest.fn();

    describe('When calling it and userTeacher insert correct params', () => {
        test('Then it should call res.json', async () => {
            teacherUser.create.mockResolvedValue({});
            await controller.userTeacherRegister(req, res);
            expect(res.json).toHaveBeenCalled();
        });
    });
    describe('When calling it and userTeacher insert incorrect params', () => {
        test('Then it should call next', async () => {
            teacherUser.find.mockRejectedValue(new Error('invalid params'));
            await controller.userTeacherRegister(req, res, next);
            expect(next).toHaveBeenCalled();
        });
    });

    describe('When calling it', () => {
        test('Then it should return an array of teacherUser', async () => {
            await controller.getAllTeachers(req, res, next);
            expect(res.json).toHaveBeenCalled();
        });
    });
    describe('When calling it and error', () => {
        beforeEach(() => {
            teacherUser.find.mockResolvedValue(null);
        });
        test('Then it should return null', async () => {
            await controller.getAllTeachers(req, res, next);
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When calling all it without finding all teacher', () => {
        test('Then it should call next ', async () => {
            teacherUser.find.mockRejectedValue(new Error('invalid params'));
            await controller.getAllTeachers(req, res, next);
            expect(next).toHaveBeenCalled();
        });
    });

    describe('When calling it', () => {
        test('Then it should return one student', async () => {
            teacherUser.findById({ name: 'Heber', password: '1234' });
            await controller.getTeacher('', res, next);
            expect(res.json).toHaveBeenCalled();
        });
    });
    describe('When calling it and error', () => {
        test('Then it should return null', async () => {
            teacherUser.findById.mockResolvedValue(null);
            await controller.getTeacher(req, res, next);
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When calling all it without finding any student', () => {
        teacherUser.findById({ name: 'Heber', password: '1234' });
        controller.getTeacher('', res, next);
        test('Then it should call next ', async () => {
            teacherUser.findById.mockRejectedValue(new Error('invalid params'));
            await controller.getTeacher('', res, next);
            expect(next).toHaveBeenCalled();
        });
    });

    describe('When calling it', () => {
        test('Then it should delete one teacher', async () => {
            teacherUser.findByIdAndDelete.mockResolvedValue({});
            await controller.deleteTeacher(req, res, next);
            expect(res.json).toHaveBeenCalled();
        });
    });
    describe('When calling it and error', () => {
        test('Then it should return null', async () => {
            teacherUser.findByIdAndDelete.mockResolvedValue(null);
            await controller.deleteTeacher(req, res, next);
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When calling all it without finding any teacher', () => {
        teacherUser.findByIdAndDelete({});
        controller.deleteTeacher('', res, next);
        test('Then it should call next ', async () => {
            teacherUser.findByIdAndDelete.mockRejectedValue(
                new Error('invalid params')
            );
            await controller.deleteTeacher(req, res, next);
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When calling it and found student with an empty array', () => {
        req = {
            tokenPayload: { userId: '08037397839837398' },
            params: {
                id: '76182376108247',
            },
        };

        test('Then it update the array', async () => {
            studentUser.findById.mockResolvedValue({
                favorites: [],
            });
            studentUser.findByIdAndUpdate.mockResolvedValue({
                favorites: ['76182376108247'],
            });
            await controller.addFavorites(req, res, next);
            expect(res.json).toHaveBeenCalled();
        });
    });
    describe('When calling it and found student with a filled array', () => {
        req = {
            tokenPayload: { userId: '08037397839837398' },
            params: {
                id: '76182376108247',
            },
        };
        test('Then it update the array', async () => {
            studentUser.findById.mockResolvedValue({
                favorites: ['08037397839837398'],
            });
            studentUser.findByIdAndUpdate.mockResolvedValue({
                favorites: [],
            });
            await controller.addFavorites(req, res, next);
            expect(res.json).toHaveBeenCalled();
        });
    });
    describe('When calling it and error', () => {
        test('Then it should return null', async () => {
            teacherUser.findById.mockRejectedValue();
            await controller.deleteTeacher(req, res, next);
            expect(next).toHaveBeenCalled();
        });
    });
});
