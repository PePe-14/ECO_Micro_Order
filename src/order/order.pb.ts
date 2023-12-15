/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "orders";

export interface Empty {
}

export interface Error {
  message: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface Order {
  id: string;
  user: User | undefined;
  product: Product | undefined;
  quantity: number;
}

export interface CreateOrderRequest {
  user: User | undefined;
  product: Product | undefined;
  quantity: number;
}

export interface CreateOrderResponse {
  order: Order | undefined;
  message: string;
}

export interface GetOrderRequest {
  orderId: string;
}

export interface GetOrderResponse {
  order: Order | undefined;
  message: string;
}

export interface GetAllOrdersResponse {
  orders: Order[];
  message: string;
}

export interface DeleteOrderRequest {
  orderId: string;
}

export interface DeleteOrderResponse {
  success: boolean;
  message: string;
}

export const ORDERS_PACKAGE_NAME = "orders";

export interface OrderServiceClient {
  createOrder(request: CreateOrderRequest): Observable<CreateOrderResponse>;

  getOrder(request: GetOrderRequest): Observable<GetOrderResponse>;

  getAllOrders(request: Empty): Observable<GetAllOrdersResponse>;

  deleteOrder(request: DeleteOrderRequest): Observable<DeleteOrderResponse>;
}

export interface OrderServiceController {
  createOrder(
    request: CreateOrderRequest,
  ): Promise<CreateOrderResponse> | Observable<CreateOrderResponse> | CreateOrderResponse;

  getOrder(request: GetOrderRequest): Promise<GetOrderResponse> | Observable<GetOrderResponse> | GetOrderResponse;

  getAllOrders(request: Empty): Promise<GetAllOrdersResponse> | Observable<GetAllOrdersResponse> | GetAllOrdersResponse;

  deleteOrder(
    request: DeleteOrderRequest,
  ): Promise<DeleteOrderResponse> | Observable<DeleteOrderResponse> | DeleteOrderResponse;
}

export function OrderServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createOrder", "getOrder", "getAllOrders", "deleteOrder"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("OrderService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("OrderService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ORDER_SERVICE_NAME = "OrderService";
