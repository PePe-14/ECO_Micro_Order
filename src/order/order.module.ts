import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schema/product.schema';
import { User, UserSchema } from './schema/user.schema';
import { Order, OrdenSchema } from './schema/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Order.name, schema: OrdenSchema },
    ])
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
