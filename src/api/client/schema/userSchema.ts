//Schema user

export const SchemaUser = {
    schema: {
        tags: ['User'],
        summary: 'Create a new user',
        body: {
            firstName: { type: 'string'},
            lastName: { type: 'string',},
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

// Schema user search

export const SchemaSaerchUser = {
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
            200: {
                id: { type: 'string'},
                email: { type: 'string'},
                name: { type: 'string'},
            },
        },
    },
}

// schema address

export const SchemaCreateAddress = {
    schema: {
        tags: ['User'],
        summary: 'Create address',
        body: {
            address: { type: 'string'},
            city: { type: 'string',},
            province: { type: 'string'},
            postalcode: { type: 'string'},
            userid: { type: 'number'},
        },
        response: {
            200: {
                id: { type: 'string'},
                email: { type: 'string'},
                name: { type: 'string'},
            },
        },
    },
}

export const SchemaUpdateAddress = {
    schema: {
        tags: ['User'],
        summary: 'Update address',
        body: {
            address: { type: 'string'},
            city: { type: 'string',},
            province: { type: 'string'},
            postalcode: { type: 'string'},
            id: { type: 'number'},
        },
        response: {
            200: {
                address: { type: 'string'},
                city: { type: 'string',},
                province: { type: 'string'},
                postalcode: { type: 'string'},
                id: { type: 'number'},
            },
        },
    },
}