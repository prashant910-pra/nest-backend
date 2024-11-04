
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop()
  product_name: string;

  @Prop()
  description: string;



    @Prop({ ref: 'User', required: true })
  user_id: string;

  @Prop()
  file_id: string;

 @Prop()
  deleted: number;

  
}

export const ProductSchema = SchemaFactory.createForClass(Product);
