import { Response, Request } from "express";
import { CreateOrderUseCase } from "./create-order.usecase";

export class CreateOrderController {
    constructor() {}

    async handle(request: Request, response: Response) {
        const useCase = new CreateOrderUseCase()
        try {
            const order = await useCase.execute(request.body)
            return response.json(order)        
        } catch (error) {
            return response.status(400).json(error)
        }
    }
}