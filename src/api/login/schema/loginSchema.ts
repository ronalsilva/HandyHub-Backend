export const SchemaUser = {
    schema: {
        tags: ['Login'],
        summary: 'Create a new user',
        body: {
            firstName: { type: 'string'},
            lastName: { type: 'string'},
            email: { type: 'string'},
            password: { type: 'string'},
        },
        response: {
            201: {
                id: { type: 'string'},
                email: { type: 'string'},
                name: { type: 'string'},
            },
        },
    }
}

//Login

export const SchemaLogin = {
    schema: {
        tags: ['Login'],
        summary: 'Login user',
        body: {
            email: { type: 'string'},
            password: { type: 'string'}
        },
        response: {
            200: {
                user: { 
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        first_name: { type: 'string' },
                        last_name: { type: 'string' },
                        email: { type: 'string' },
                        handyman_status: { type: 'boolean' }
                    },
                 },
                accessToken: { type: 'string'}
            },
        },
    },
}

export const SchemaLoginGmail = {
    schema: {
        tags: ['Login'],
        summary: 'Login user - Gmail',
        body: { googleToken: {type: 'string'} },
    },
}