
import { IsString, IsInt, Min, Max,MaxLength,IsOptional,IsNumber,Length, IsEmail,Matches } from 'class-validator';
import { Type } from 'class-transformer';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({ timestamps: true }) 
export class CreateUserDto {
  @IsString()
  @Length(5, 20, {
    message: 'Name must be between 5 and 20 characters.',
  })
  name: string;

  @IsString()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @Matches(/^\(\d{3}\) \d{3}-\d{4}$/, { message: 'Phone number must be valid.' })
  phone: string;

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.',
  })
  password: string;

  @IsString()
  type: string;

  @IsInt()
  @IsOptional()
  deleted?: number;
}
