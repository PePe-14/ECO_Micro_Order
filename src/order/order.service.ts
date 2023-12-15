import { Injectable } from '@nestjs/common';
import {
  CreateOrderRequest,
  CreateOrderResponse,
  GetAllOrdersResponse,
  GetOrderRequest,
  GetOrderResponse,
  DeleteOrderRequest,
  DeleteOrderResponse,
  OrderServiceControllerMethods,
  Empty,
} from './order.pb';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schema/order.schema';

@Injectable()
@OrderServiceControllerMethods()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
  ) {}

  async createOrder(request: CreateOrderRequest): Promise<CreateOrderResponse> {
    try {
      // Implementa la lógica para crear una Order en MongoDB
      const user = request.user;
      const product = request.product;

      const newOrder: Order = {
        id: undefined,
        user: {
          id: user.id,
          username: user.username,
          password: user.password,
          email: user.email,
        },
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
        },
        quantity: request.quantity,
      };

      const createdOrder = new this.orderModel(newOrder);
      await createdOrder.save();

      return {
        order: {
          id: createdOrder._id.toString(),
          user: {
            id: createdOrder.user.id,
            username: createdOrder.user.username,
            password: createdOrder.user.password,
            email: createdOrder.user.email,
          },
          product: {
            id: createdOrder.product.id,
            name: createdOrder.product.name,
            price: createdOrder.product.price,
          },
          quantity: createdOrder.quantity,
        },
        message: 'Orden creada con éxito',
      };
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  }

  async getAllOrders(request: Empty): Promise<GetAllOrdersResponse> {
    try {
      const orderList = await this.orderModel.find().lean().exec();

      const transformedOrders = orderList.map(order => {
        order.id = order._id.toString();
        delete order._id;
        return order;
      });

      return { orders: transformedOrders, message: 'Lista de órdenes obtenida con éxito' };
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  }

  async getOrder(request: GetOrderRequest): Promise<GetOrderResponse> {
    try {
      const orderFound = await this.orderModel.findOne({ _id: request.orderId }).exec();

      if (!orderFound) {
        return { order: undefined, message: 'Order no encontrada' };
      }

      return {
        order: {
          id: orderFound._id.toString(),
          user: {
            id: orderFound.user.id,
            username: orderFound.user.username,
            password: orderFound.user.password,
            email: orderFound.user.email,
          },
          product: {
            id: orderFound.product.id,
            name: orderFound.product.name,
            price: orderFound.product.price,
          },
          quantity: orderFound.quantity,
        },
        message: 'Orden obtenida con éxito',
      };
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  }

  async deleteOrder(request: DeleteOrderRequest): Promise<DeleteOrderResponse> {
    try {
      const deletedOrder = await this.orderModel.findByIdAndDelete(request.orderId).exec();

      if (!deletedOrder) {
        return { success: false, message: 'Order no encontrada' };
      }

      return { success: true, message: 'Order eliminada con éxito' };
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  }
}
