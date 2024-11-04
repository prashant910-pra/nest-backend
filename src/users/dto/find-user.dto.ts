import { IsOptional, IsString, IsEmail,IsNumber,IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class FindUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string; 

  @IsOptional()
  @IsString()
  type?: string; 

  @IsOptional()  
  deleted?: number;

  @IsOptional()
  @IsDateString()
  start?: string;

  @IsOptional()
  @IsDateString()
  end?: string;

  @IsOptional()
  @IsDateString()
  createdAt?: string;

  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @Type(() => Number) 
  @IsNumber()
  page?: number;

  @IsOptional()
  @Type(() => Number) 
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsString()
  sortBy?: string;
}
