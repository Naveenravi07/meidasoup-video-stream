import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { deleteMetadata } from 'reflect-metadata/no-conflict';

let mockDb = {
    from: jest.fn().mockReturnThis(),
    select: jest.fn(),
    where: jest.fn().mockReturnValue([]),
    insert: jest.fn().mockReturnThis(),
    returning: jest.fn().mockResolvedValue([{ id: 1, email: 'test@example.com', name: 'Test User' }]),
}

describe('UsersService', () => {
    let service: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UsersService, {
                provide: "DRIZZLE_CLIENT",
                useValue: mockDb
            }],
        }).compile();

        service = module.get<UsersService>(UsersService);
        jest.clearAllMocks()
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create User', () => {

        it('should create a user successfully', async () => {
            const newUser = { email: 'test@example.com', name: 'Test User', phone: '1234567890', pwd: "123" };

            mockDb.select.mockReturnValueOnce({
                from: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnValue([]),
            });

            mockDb.insert.mockReturnValueOnce({
                values: jest.fn().mockReturnThis(),
                returning: jest.fn().mockResolvedValueOnce([{ ...newUser, id: 1 }])
            });

            const result = await service.createUser(newUser);
            expect(result).toEqual({ ...newUser, id: 1, pwd: undefined });
            expect(mockDb.insert).toHaveBeenCalled();
        });

        it('should not create a duplicate user', async () => {
            const newUser = { email: 'test@example.com', name: 'Test User', phone: '1234567890', pwd: "123" };

            mockDb.select.mockReturnValueOnce({
                from: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnValue([{ ...newUser, id: 1 }]),
            });

            await expect(service.createUser(newUser)).rejects.toThrow(ConflictException);

            expect(mockDb.select).toHaveBeenCalled();
            expect(mockDb.insert).not.toHaveBeenCalled();
        });

    });

    describe("get user", () => {
        it('should return the user details successfully', async () => {
            const user = { email: 'test@example.com', name: 'Test User', phone: '1234567890' };

            mockDb.select.mockReturnValueOnce({
                from: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnValueOnce([{ ...user, id: 1 }])
            })
            let res = await service.getUser(1);
            expect(res).toEqual({ ...user, id: 1 })

        })

        it('should  throw a not found exception when a invalid id provided', async () => {
            let some_random_stupid_id = 931318318;

            mockDb.select.mockReturnValueOnce({
                from: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnValueOnce([])
            })
            await expect(service.getUser(some_random_stupid_id)).rejects.toThrow(NotFoundException)
            expect(mockDb.select).toHaveBeenCalled()

        })

        it('should throw not found exception when a null id  field is provided', async () => {
            let some_random_stupid_id = null;

            mockDb.select.mockReturnValueOnce({
                from: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnValueOnce([])
            })
            await expect(service.getUser(some_random_stupid_id as unknown as number)).rejects.toThrow(NotFoundException)
            expect(mockDb.select).toHaveBeenCalled()
        })

    })
});

