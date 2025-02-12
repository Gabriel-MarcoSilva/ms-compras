import { prismaClient } from "../../infra/database/prismaClient"
import { KafkaSendMessage } from "../../infra/providers/kafka/producer"

type UpdateOrderRequest = {
    id: string,
    status: string
}

export class UpdateOrderUseCase {
    constructor () {}
    //aqui vai mandar pra o microsserviço de status pra só dizer o q tá fazedno
    async execute(data: UpdateOrderRequest) {
        const orderUpdate = await prismaClient.order.update({
            where: {
                id: data.id,
            },
            data: {
                status: data.status
            }
        })

        const kafkaSendMessage = new KafkaSendMessage()
        await kafkaSendMessage.execute('ORDER_STATUS', {
            customerId: orderUpdate.id,
            status: orderUpdate.status
        })
    }
}