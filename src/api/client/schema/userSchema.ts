//Schema user

export const SchemaUser = {
    schema: {
        tags: ['User'],
        summary: 'Create a new user',
        body: {
            type: 'object',
            properties: {
                user: {
                    type: 'object',
                    required: ['email', 'first_name', 'last_name', 'password'],
                    properties: {
                        first_name: { type: 'string'},
                        last_name: { type: 'string'},
                        email: { type: 'string'},
                        password: { type: 'string'},
                    }
                },
                address: {
                    type: 'object',
                    required: ['address', 'city', 'province', 'postal_code'],
                    properties: {
                        address: { type: 'string' },
                        city: { type: 'string' },
                        province: { type: 'string' },
                        postal_code: { type: 'string' }
                    }
                }
            }
        },
        response: {
            201: {
                user: {
                    type: 'object',
                    required: ['email'],
                    properties: {
                        id: { type: 'string' },
                        first_name: { type: 'string'},
                        last_name: { type: 'string'},
                        email: { type: 'string'},
                    }
                },
                address: {
                    type: 'object',
                    properties: {
                        address: { type: 'string' },
                        city: { type: 'string' },
                        province: { type: 'string' },
                        postal_code: { type: 'string' }
                    }
                }
            },
            404: {
                code: { type: 'string' },
                error: { type: 'string' },
                message: { type: 'string' },            
            },
            400: {
                code: { type: 'string' },
                error: { type: 'string' },
                message: { type: 'string' },            
            },
            500: {
                code: { type: 'string' },
                mensage: { type: 'string' },
            }
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
            201: {
                id: { type: 'string'},
                email: { type: 'string'},
                first_name: { type: 'string'},
                last_name: { type: 'string'},
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