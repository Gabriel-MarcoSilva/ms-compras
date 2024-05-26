import { Request, Response } from "express";
import { CreateProductUseCase } from "./create-product.usecase";
export class CreateProductController {
    constructor() {}

    async handle (request: Request, response: Response) {
        const useCase = new CreateProductUseCase()
        try {
            const result = await useCase.execute(request.body)
            return response.json(result)
        } catch (error) {
            return response.status(400).json(error)
        }
    }
}