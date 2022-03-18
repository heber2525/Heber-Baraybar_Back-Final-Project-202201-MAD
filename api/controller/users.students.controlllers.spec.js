import studentUser from '../models/students.model.js';
import * as controller from './users.students.controllers.js';

jest.mock('../models/students.model.js');

describe('Given the function UserStudentRegister', () => {
    const mockRequest = {
        params: { id: 'testId' },
        body: { password: '12345' },
    };

    const req = mockRequest;
    const res = { json: jest.fn() };
    const next = jest.fn();

    describe('When calling it and userStudent insert correct params', () => {
        test('Then it should call res.json', async () => {
            studentUser.create.mockResolvedValue({});
            await controller.userStudentRegister(req, res);
            expect(res.json).toHaveBeenCalled();
        });
    });
    describe('When calling it and userStudent insert incorrect params', () => {
        test('Then it should call next', async () => {
            studentUser.create.mockRejectedValue(new Error('invalid params'));
            await controller.userStudentRegister(req, res, next);
            expect(next).toHaveBeenCalled();
        });
    });

    describe('When calling it', () => {
        test('Then it should return an array of studentUser', async () => {
            await controller.getAllStudents('', res, next);
            expect(res.json).toHaveBeenCalled();
        });
    });
    describe('When calling all it without finding all students', () => {
        test('Then it should call next ', async () => {
            studentUser.find.mockRejectedValue(new Error('invalid params'));
            await controller.getAllStudents('', res, next);
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When calling it', () => {
        test('Then it should return one student', async () => {
            studentUser.findById({ name: 'Heber', password: '1234' });
            await controller.getStudent('', res, next);
            expect(res.json).toHaveBeenCalled();
        });
    });
    describe('When calling all it without finding any student', () => {
        beforeEach(() => {
            studentUser.findById({ name: 'Heber', password: '1234' });
        });
        test('Then it should call next ', async () => {
            studentUser.findById.mockRejectedValue(new Error('invalid params'));
            await controller.getStudent('', res, next);
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When calling it', () => {
        test('Then it should return one student', async () => {
            studentUser.findByIdAndDelete({ name: 'Heber', password: '1234' });
            await controller.deleteStudent('', res, next);
            expect(res.json).toHaveBeenCalled();
        });
    });
    describe('When calling all it without finding any student', () => {
        studentUser.findByIdAndDelete({ name: 'Heber', password: '1234' });

        test('Then it should call next ', async () => {
            studentUser.findByIdAndDelete.mockRejectedValue(
                new Error('no data')
            );
            await controller.deleteStudent('', res, next);
            expect(next).toHaveBeenCalled();
        });
    });
});
