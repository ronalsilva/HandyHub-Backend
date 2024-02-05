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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
const prisma_1 = __importDefault(require("../../utils/prisma"));
jest.mock('../../utils/prisma', () => ({
    user: {
        create: jest.fn(),
        findUnique: jest.fn(),
        findMany: jest.fn(),
    },
}));
describe('createUser function', () => {
    it('should create a user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = { name: 'John Doe', email: 'john@example.com', password: 'password123' };
        yield (0, _1.createUser)(userData);
        expect(prisma_1.default.user.create).toHaveBeenCalledWith(expect.objectContaining({
            data: expect.objectContaining({
                name: 'John Doe',
                email: 'john@example.com',
            }),
        }));
    }));
});
describe('findUserByEmail function', () => {
    it('should find a user by email', () => __awaiter(void 0, void 0, void 0, function* () {
        const userEmail = 'john@example.com';
        const mockUser = { id: 1, name: 'John Doe', email: userEmail };
        jest.spyOn(prisma_1.default.user, 'findUnique').mockResolvedValue(mockUser);
        const user = yield (0, _1.findUserByEmail)(userEmail);
        expect(user).toEqual(mockUser);
    }));
});
describe('findUsers function', () => {
    it('should find a list of users with specified fields', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUsers = [
            { id: 1, name: 'User1', email: 'user1@example.com' },
            { id: 2, name: 'User2', email: 'user2@example.com' },
        ];
        jest.spyOn(prisma_1.default.user, 'findMany').mockResolvedValue(mockUsers);
        const users = yield (0, _1.findUsers)();
        expect(users).toEqual(mockUsers);
    }));
});
