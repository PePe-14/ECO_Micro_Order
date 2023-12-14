import { IsNotEmpty, IsNumber, IsString } from 'class-validator';


export class CreateOrderDto {
    @IsNotEmpty()
    @IsNumber()
    quantity: number
    
    @IsNotEmpty()
    @IsString()
    userid: string
}
