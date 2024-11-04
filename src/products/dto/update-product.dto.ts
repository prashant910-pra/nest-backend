
import { IsEmail, IsOptional, IsString,Length } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  deleted?: number;

  @IsOptional()
  @IsString()
  @Length(5, 20, {
    message: 'Name must be between 5 and 10 characters.',
  })
  product_name: string;

  @IsOptional()
  @IsString()
  @Length(10, 100, {
    message: 'Description must be between 10 and 100 characters.',
  })
  description: string;
  
}
