const ResponseUser = {
    id: { type: 'string'},
    email: { type: 'string'},
    name: { type: 'string'},
}

const RequestUser = {
    firstName: { type: 'string'},
    lastName: { type: 'string'},
    email: { type: 'string'},
    password: { type: 'string'},
}

export const SchemaUser = {
    schema: {
        tags: ['Login'],
        summary: 'Create a new user',
        body: RequestUser,
        response: {
            201: ResponseUser,
        },
    }
}

//Login

const RequestUserLogin = {
    email: { type: 'string'},
    password: { type: 'string'}
}

const ResponseUserLogin = {
    user: { ResponseUser },
    accessToken: { type: 'string'}
}

export const SchemaLogin = {
    schema: {
        tags: ['Login'],
        summary: 'Login user',
        body: RequestUserLogin,
        response: {
            200: ResponseUserLogin,
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

// Get user