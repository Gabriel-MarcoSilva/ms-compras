import { Router } from "express";
import { CreateOrderController } from "../modules/create-order/create-order.controller";
import { UpdateOrderController } from "../modules/update-order/update-order.controller";

const router = Router()

router.post('/pedido', (request, response) => {
    new CreateOrderController().handle(request, response)
})

router.put('/pedido', (request, response) => {
    new UpdateOrderController().handle(request, response)
})

export { router }