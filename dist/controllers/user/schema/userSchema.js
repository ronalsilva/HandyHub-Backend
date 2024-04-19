"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseUserLogin = exports.RequestUserLogin = exports.RequestUser = exports.ResponseUser = void 0;
exports.ResponseUser = {
    id: { type: 'string' },
    email: { type: 'string' },
    name: { type: 'string' },
};
exports.RequestUser = {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
};
//Login
exports.RequestUserLogin = {
    email: { type: 'string' },
    password: { type: 'string' }
};
exports.ResponseUserLogin = {
    user: {
        id: { type: 'string' },
        email: { type: 'string' },
        name: { type: 'string' },
    },
    accessToken: { type: 'string' }
};
