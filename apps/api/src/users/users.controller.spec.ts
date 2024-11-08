import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { BadRequestException } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user-request';

describe('UsersController', () => {
    let controller: UsersController;
    let usersService: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: {
                        createUser: jest.fn().mockResolvedValue({}),
                    },
                },
            ],
        }).compile();

        controller = module.get<UsersController>(UsersController);
        usersService = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('createUser', () => {
        it('should call UsersService.createUser with correct data', async () => {
            const validBody: CreateUserRequest = {
                email: 'john.doe@example.com',
                name: 'John Doe',
                phone: '1234567890',
                pwd:"123"
            };

            const _result = await controller.createUser(validBody);
            expect(usersService.createUser).toHaveBeenCalledWith(validBody);
        });

        it('should throw BadRequestException if required fields are missing', async () => {
            const invalidBody = { name: 'John Doe' };
            try {
                await controller.createUser(invalidBody as CreateUserRequest);
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestException);
                if (error instanceof Error) {
                    expect(error.message).toContain('Validation failed');
                }
            }
        });

        it('should throw BadRequestException if fields are of the wrong type', async () => {
            const invalidBody = { email: 123, name: true, phone: null };
            try {
                await controller.createUser(invalidBody as unknown as CreateUserRequest);
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestException);
                if (error instanceof Error) {
                    expect(error.message).toContain('Validation failed');
                }
            }
        });
    });
});
