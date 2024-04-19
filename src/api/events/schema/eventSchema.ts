export const ResponseEventSchema = {
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
}

export const RequestEventSchema = { country: { type: 'string' } }