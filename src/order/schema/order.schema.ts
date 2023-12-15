import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User, UserSchema } from './user.schema';
import { Product, ProductSchema } from './product.schema';

export type OrderDocument = Order & Document;


@Schema()
export class Order {
  @Prop({ type: String })
  id: string;

  @Prop({ type: UserSchema })
  user: User;

  @Prop({ type: ProductSchema })
  product: Product;

  @Prop()
  quantity: number;
}

export const OrdenSchema = SchemaFactory.createForClass(Order);
