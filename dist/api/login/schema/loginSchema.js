"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaLoginGmail = exports.SchemaLogin = exports.SchemaUser = void 0;
const ResponseUser = {
    id: { type: 'string' },
    email: { type: 'string' },
    name: { type: 'string' },
};
const RequestUser = {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
};
exports.SchemaUser = {
    schema: {
        tags: ['Login'],
        summary: 'Create a new user',
        body: RequestUser,
        response: {
            201: ResponseUser,
        },
    }
};
//Login
const RequestUserLogin = {
    email: { type: 'string' },
    password: { type: 'string' }
};
const ResponseUserLogin = {
    user: { ResponseUser },
    accessToken: { type: 'string' }
};
exports.SchemaLogin = {
    schema: {
        tags: ['Login'],
        summary: 'Login user',
        body: RequestUserLogin,
        response: {
            200: ResponseUserLogin,
        },
    },
};
exports.SchemaLoginGmail = {
    schema: {
        tags: ['Login'],
        summary: 'Login user - Gmail',
        body: { googleToken: { type: 'string' } },
    },
};
// Get user
