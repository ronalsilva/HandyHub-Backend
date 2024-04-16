"use strict";
// import { createUser, findUserByEmail, findUsers } from './';
// import prisma from '../../utils/prisma';
// jest.mock('../../utils/prisma', () => ({
//     user: {
//         create: jest.fn(),
//         findUnique: jest.fn(),
//         findMany: jest.fn(),
//     },
// }));
// describe('createUser function', () => {
//     // it('should create a user successfully', async () => {
//     //     const userData = { firstName: 'teste', lastName: 'teste', email: 'john@example.com', password: 'password123' };
//     //     await createUser(userData);
//     //     expect(prisma.user.create).toHaveBeenCalledWith(
//     //         expect.objectContaining({
//     //             data: expect.objectContaining({"email": "john@example.com", "name": "teste teste", "password": "da70f0db991e5184aa6b83667609c495b6ee56e17d0c33f8a7bf961731bcb348abdbc749e3927c8f0a6785e37a7d39e9650a98ef07e0bdf0e694c13c69dfe719", "salt": "6483f6f35745847e1be2a3d2ef4e200a"}),
//     //         })
//     //     );
//     // });
// });
// describe('findUserByEmail function', () => {
//     it('should find a user by email', async () => {
//         const userEmail = 'john@example.com';
//         const mockUser:any = { id: 1, name: 'John Doe', email: userEmail };
//         jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUser);
//         const user = await findUserByEmail(userEmail);
//         expect(user).toEqual(mockUser);
//     });
// });
// // describe('findUsers function', () => {
// //     it('should find a list of users with specified fields', async () => {
// //         const mockUsers:any = [
// //             { id: 1, name: 'User1', email: 'user1@example.com' },
// //             { id: 2, name: 'User2', email: 'user2@example.com' },
// //         ];
// //         jest.spyOn(prisma.user, 'findMany').mockResolvedValue(mockUsers);
// //         const users = await findUsers();
// //         expect(users).toEqual(mockUsers);
// //     });
// });
