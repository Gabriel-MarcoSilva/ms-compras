import { prismaClient } from "../../infra/database/prismaClient"

type CreateOrderRequest = {
    customerId: string, //vem do token
    items: [{ //itens carrinho
        productId: string,
        quantity: number
    }]
}

export class CreateOrderUseCase {
    constructor() {}

    async execute (data: CreateOrderRequest) {
        
        //requisiçao para API de produtos para verificar se tem estoque
        //se houver estoque
        const order = await prismaClient.order.create({
            data: {
                customerId: data.customerId,
                status: "AGUARDANDO_PAGAMENTO",
                OrderItems: {
                    createMany: {
                        data: data.items
                    }
                }
            }
        })

        //se não houver, mandar um erro
        return order
    }
}