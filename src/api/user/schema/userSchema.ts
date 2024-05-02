import Joi from "joi"

const ResponseUser = {
    id: { type: 'string'},
    email: { type: 'string'},
    name: { type: 'string'},
}

// const ResponseUser = Joi.object().keys({
//     id: Joi.string(),
//     email: Joi.string(),
//     name: Joi.string(),
// })

const RequestUser = {
    firstName: { type: 'string'},
    lastName: { type: 'string',},
    email: { type: 'string'},
    password: { type: 'string'},
}

// const RequestUser = Joi.object().keys({
//     firstName: Joi.string().required(),
//     lastName: Joi.string().required(),
//     email: Joi.string().required(),
//     password: Joi.string().required()
// }).required()

export const SchemaUser = {
    schema: {
        tags: ['User'],
        summary: 'Create a new user',
        body: RequestUser,
        response: {
            201: ResponseUser,
        },
    }
}

// Get user

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
            200: ResponseUser,
        },
    },
}