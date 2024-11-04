// user/dto/update-user.dto.ts
import { IsEmail, IsNumber, IsOptional, IsString,Length,Matches } from 'class-validator';
import { Type } from 'class-transformer';
export class UpdateUserDto {
  
  @IsOptional()
  deleted?: number;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  @IsOptional()
  @IsString()
  @Length(5, 20, {
    message: 'Name must be between 5 and 20 characters.',
  })
  name?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{10}$/, { message: 'Phone number must be exactly 10 digits.' })
  phone: string;

  @IsOptional()
  @IsString()
  @Length(8, 12, {
    message: 'Name must be between 8 and 12 characters.',
  })
  password?: string;

  @IsOptional()
  @IsString()
  type?: string;

  
}
