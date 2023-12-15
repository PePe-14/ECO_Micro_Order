import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { OrderService } from './order.service';
import {
  CreateOrderRequest,
  CreateOrderResponse,
  GetOrderRequest,
  GetOrderResponse,
  GetAllOrdersResponse,
  DeleteOrderRequest,
  DeleteOrderResponse,
  ORDER_SERVICE_NAME,
  Empty,
} from './order.pb';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @GrpcMethod(ORDER_SERVICE_NAME, 'createOrder')
  async createOrder(request: CreateOrderRequest): Promise<CreateOrderResponse> {
    return this.orderService.createOrder(request);
  }

  @GrpcMethod(ORDER_SERVICE_NAME, 'getOrder')
  async getOrder(request: GetOrderRequest): Promise<GetOrderResponse> {
    return this.orderService.getOrder(request);
  }

  @GrpcMethod(ORDER_SERVICE_NAME, 'getAllOrders')
  async getAllOrders(request: Empty): Promise<GetAllOrdersResponse> {
    return this.orderService.getAllOrders(request);
  }

  @GrpcMethod(ORDER_SERVICE_NAME, 'deleteOrder')
  async deleteOrder(request: DeleteOrderRequest): Promise<DeleteOrderResponse> {
    return this.orderService.deleteOrder(request);
  }
}
