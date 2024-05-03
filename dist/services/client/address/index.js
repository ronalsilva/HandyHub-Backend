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
exports.updateAddress = exports.registerAddress = void 0;
const prisma_1 = __importDefault(require("../../../utils/prisma"));
function registerAddress(body) {
    return __awaiter(this, void 0, void 0, function* () {
        const { address, city, province, postalcode, userid } = body;
        const data = {
            address,
            city,
            province,
            postalCode: postalcode,
            userId: userid
        };
        const addressUser = yield prisma_1.default.address.create({
            data
        });
        return addressUser;
    });
}
exports.registerAddress = registerAddress;
function updateAddress(body) {
    return __awaiter(this, void 0, void 0, function* () {
        const { address, city, province, postalcode, id } = body;
        const data = {
            address,
            city,
            province,
            postalCode: postalcode
        };
        const addressUser = yield prisma_1.default.address.update({
            where: { id },
            data
        });
        return addressUser;
    });
}
exports.updateAddress = updateAddress;
