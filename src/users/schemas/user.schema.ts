// cats/schemas/cat.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  phone: string;

  @Prop()
  type: string;

  /*
  @Prop({ required: true })
  createdAt: Date;
*/

  @Prop()
  dateField: Date; // Assuming you have a date field

  @Prop()
  deleted: number;

  
}

export const UserSchema = SchemaFactory.createForClass(User);
