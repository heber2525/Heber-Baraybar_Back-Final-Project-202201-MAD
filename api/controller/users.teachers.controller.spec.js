import teacherUser from '../models/students.model.js';
import * as controller from './users.teachers.controller.js';
jest.mock('../models/teachers.model.js');

describe('Given the function userTeacherRegister', () => {
    const mockRequest = {
        params: { id: 'testId' },
        body: { password: '12345' },
    };

    const req = mockRequest;
    const res = { json: jest.fn() };
    const next = jest.fn();

    describe('When calling it and userTeacher insert correct params', () => {
        test('Then it should call res.json', async () => {
            teacherUser.create.mockResolvedValue({});
            controller.userTeacherRegister(req, res);
            expect(res.json).toHaveBeenCalled();
        });
    });
    describe('When calling it and userTeacher insert incorrect params', () => {
        test('Then it should call next', async () => {
            teacherUser.create.mockRejectedValue(new Error('invalid params'));
            controller.userTeacherRegister(req, res, next);
            expect(next).toHaveBeenCalled();
        });
    });

    describe('When calling it', () => {
        test('Then it should return an array of teacherUser', async () => {
            await controller.getAllTeacher('', res, next);
            expect(res.json).toHaveBeenCalled();
        });
    });
    describe('When calling all it without finding all teacher', () => {
        test('Then it should call next ', async () => {
            teacherUser.find.mockRejectedValue(new Error('invalid params'));
            controller.getAllTeacher('', res, next);
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
    describe('When calling all it without finding any student', () => {
        teacherUser.findByIdAndDelete({ name: 'Heber', password: '1234' });
        controller.deleteTeacher('', res, next);

        test('Then it should call next ', async () => {
            teacherUser.findByIdAndDelete.mockRejectedValue(
                new Error('invalid params')
            );
            await controller.deleteTeacher('', res, next);
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When calling it', () => {
        test('Then it should return one teacher', async () => {
            teacherUser.findByIdAndDelete({ name: 'Heber', password: '1234' });
            await controller.deleteTeacher('', res, next);
            expect(res.json).toHaveBeenCalled();
        });
    });
    describe('When calling all it without finding any teacher', () => {
        teacherUser.findByIdAndDelete({ name: 'Heber', password: '1234' });
        controller.deleteTeacher('', res, next);
        test('Then it should call next ', async () => {
            teacherUser.findByIdAndDelete.mockRejectedValue(
                new Error('invalid params')
            );
            await controller.deleteTeacher('', res, next);
            expect(next).toHaveBeenCalled();
        });
    });
});
