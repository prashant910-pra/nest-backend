
import { IsString, IsInt, Min, Max,MaxLength,IsOptional,Length } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({ timestamps: true }) 
export class CreateProductDto {
  @IsString()
  @Length(5, 20, {
    message: 'Name must be between 10 and 20 characters.',
  })
  product_name: string;

  @IsString()
  @Length(10, 100, {
    message: 'Description must be between 10 and 100 characters.',
  })
  description: string;

  @IsString()
  file_id: string;

  @IsString()
  user_id: number;
  
  @IsInt()
  @IsOptional()
  deleted?: number;
}
