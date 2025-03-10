"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaSaerchUser = exports.SchemaLogin = exports.SchemaUser = void 0;
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
        tags: ['User'],
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
        tags: ['User'],
        summary: 'Login user',
        body: RequestUserLogin,
        response: {
            200: ResponseUserLogin,
        },
    },
};
// Get user
exports.SchemaSaerchUser = {
    schema: {
        tags: ['User'],
        summary: 'Search user',
        params: {
            id: { type: 'number' }
        },
        security: [
            {
                "apiKey": []
            }
        ],
        response: {
            200: ResponseUser,
        },
    },
};
