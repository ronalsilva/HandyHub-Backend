"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestUserLogin = exports.RequestUser = exports.ResponseUser = void 0;
exports.ResponseUser = {
    email: { type: 'string' },
    password: { type: 'string' },
    name: { type: 'string' },
};
exports.RequestUser = {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
};
exports.RequestUserLogin = {
    email: { type: 'string' },
    password: { type: 'string' }
};
