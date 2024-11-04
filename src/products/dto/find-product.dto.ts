
import { IsOptional, IsString, IsEmail,IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class FindProductDto {
  @IsOptional()
  @IsString()
  product_name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  user_id?: string;

  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()  
  
  deleted?: number;

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
