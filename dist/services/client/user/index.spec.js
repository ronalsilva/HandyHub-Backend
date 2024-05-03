"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
jest.mock('../../../utils/hash', () => ({
    hashPassword: jest.fn(() => ({ hash: 'hashedPassword', salt: 'salt' })),
}));
jest.mock('../../../utils/prisma', () => ({
    user: {
        create: jest.fn((data) => (Object.assign({ id: 1 }, data))),
        findUnique: jest.fn((options) => {
            if (options.where.email === 'existingemail@example.com') {
                return { id: 2, name: 'Existing User', email: 'existingemail@example.com' };
            }
            else {
                return null;
            }
        }),
    },
}));
describe('User Functions', () => {
    describe('createUser', () => {
        it('should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
            const userData = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                password: 'password',
            };
            const newUser = yield (0, _1.createUser)(userData);
            expect(newUser).toEqual({ id: 1, name: 'John Doe', email: 'john.doe@example.com' });
        }));
    });
    describe('findUserByEmail', () => {
        it('should find a user by email', () => __awaiter(void 0, void 0, void 0, function* () {
            const existingUser = yield (0, _1.findUserByEmail)('existingemail@example.com');
            expect(existingUser).toEqual({ id: 2, name: 'Existing User', email: 'existingemail@example.com' });
        }));
        it('should return null if user is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            const nonExistingUser = yield (0, _1.findUserByEmail)('nonexistingemail@example.com');
            expect(nonExistingUser).toBeNull();
        }));
    });
    describe('findUserById', () => {
        it('should find a user by id', () => __awaiter(void 0, void 0, void 0, function* () {
            const existingUser = yield (0, _1.findUserById)(2);
            expect(existingUser).toEqual({ id: 2, name: 'Existing User', email: 'existingemail@example.com' });
        }));
        it('should return null if user is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            const nonExistingUser = yield (0, _1.findUserById)(999);
            expect(nonExistingUser).toBeNull();
        }));
    });
});
