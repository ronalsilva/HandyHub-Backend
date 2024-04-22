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
exports.findUserById = exports.findUserByEmail = exports.createUser = void 0;
const hash_1 = require("../../utils/hash");
const prisma_1 = __importDefault(require("../../utils/prisma"));
function createUser(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const { password } = input;
        const data = {
            name: `${input.firstName} ${input.lastName}`,
            email: input.email,
        };
        const { hash, salt } = (0, hash_1.hashPassword)(password);
        const user = yield prisma_1.default.user.create({
            data: Object.assign(Object.assign({}, data), { salt, password: hash }),
        });
        return user;
    });
}
exports.createUser = createUser;
function findUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma_1.default.user.findUnique({
            where: {
                email,
            },
        });
    });
}
exports.findUserByEmail = findUserByEmail;
function findUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield prisma_1.default.user.findUnique({
            where: {
                id: id,
            },
        });
        return result;
    });
}
exports.findUserById = findUserById;
