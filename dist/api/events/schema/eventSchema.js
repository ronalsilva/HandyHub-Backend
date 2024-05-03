"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestEventSchema = exports.ResponseEventSchema = void 0;
exports.ResponseEventSchema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            type: { type: 'string' },
            id: { type: 'string' },
            test: { type: 'boolean' },
            url: { type: 'string' },
            locale: { type: 'string' },
            images: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        ratio: { type: 'string' },
                        url: { type: 'string' },
                        width: { type: 'integer' },
                        height: { type: 'integer' },
                        fallback: { type: 'boolean' },
                    },
                },
            },
        },
    },
};
exports.RequestEventSchema = { country: { type: 'string' } };
