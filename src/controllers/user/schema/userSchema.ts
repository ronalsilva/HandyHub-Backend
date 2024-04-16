export const ResponseUser = {
    id: { type: 'string'},
    email: { type: 'string'},
    name: { type: 'string'},
}

export const RequestUser = {
    firstName: { type: 'string'},
    lastName: { type: 'string'},
    email: { type: 'string'},
    password: { type: 'string'},
}

//Login

export const RequestUserLogin = {
    email: { type: 'string'},
    password: { type: 'string'}
}

export const ResponseUserLogin = {
    user: {
        id: { type: 'string' },
        email: { type: 'string'},
        name: { type: 'string'},
    },
    accessToken: { type: 'string'}
}
