import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'orden',
  timestamps:true  
})
export class Order extends Document {
  @Prop()
  quantity:number;

  @Prop()
  userID: string;
}

export const UserSchema = SchemaFactory.createForClass(Order);
