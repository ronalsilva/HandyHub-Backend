import { createUser, findUserByEmail, findUserById } from './';

jest.mock('../../../utils/hash', () => ({
    hashPassword: jest.fn(() => ({ hash: 'hashedPassword', salt: 'salt' })),
}));

jest.mock('../../../utils/prisma', () => ({
    user: {
        create: jest.fn((data) => ({ id: 1, ...data })),
        findUnique: jest.fn((options) => {
            if (options.where.email === 'existingemail@example.com') {
                return { id: 2, name: 'Existing User', email: 'existingemail@example.com' };
            } else {
                return null;
            }
        }),
    },
}));

describe('User Functions', () => {
    describe('createUser', () => {
        it('should create a new user', async () => {
            const userData = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                password: 'password',
            };

            const newUser = await createUser(userData);
            expect(newUser).toEqual({ id: 1, name: 'John Doe', email: 'john.doe@example.com' });
        });
    });

    describe('findUserByEmail', () => {
        it('should find a user by email', async () => {
            const existingUser = await findUserByEmail('existingemail@example.com');
            expect(existingUser).toEqual({ id: 2, name: 'Existing User', email: 'existingemail@example.com' });
        });

        it('should return null if user is not found', async () => {
            const nonExistingUser = await findUserByEmail('nonexistingemail@example.com');
            expect(nonExistingUser).toBeNull();
        });
    });

    describe('findUserById', () => {
        it('should find a user by id', async () => {
            const existingUser = await findUserById(2);
            expect(existingUser).toEqual({ id: 2, name: 'Existing User', email: 'existingemail@example.com' });
        });

        it('should return null if user is not found', async () => {
            const nonExistingUser = await findUserById(999);
            expect(nonExistingUser).toBeNull();
        });
    });
});
