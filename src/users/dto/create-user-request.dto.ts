import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserRequest {
    @IsString()
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsString()
    @IsNotEmpty({ message: 'Phone is required' })
    phone: string;
}