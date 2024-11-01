import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

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
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create User', () => {

        it('should create a user successfully', async () => {
            const newUser = { email: 'test@example.com', name: 'Test User', phone: '1234567890' };

            mockDb.select.mockReturnValueOnce({
                from: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnValue([]),
            });

            mockDb.insert.mockReturnValueOnce({
                values: jest.fn().mockReturnThis(),
                returning: jest.fn().mockResolvedValueOnce([{ ...newUser, id: 1 }])
            });

            const result = await service.createUser(newUser);
            expect(result).toEqual({ ...newUser, id: 1 });
            expect(mockDb.insert).toHaveBeenCalled();
        });

    });

});

