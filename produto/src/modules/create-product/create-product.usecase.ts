import { prismaClient } from "../../infra/database/prismaClient"
import { KafkaSendMessage } from "../../infra/providers/kafka/producer"

type CreateProductRequest = {
    name: string,
    price: number,
    quantidade: number,
    code: string
}

export class CreateProductUseCase {
    constructor () {}

    //verifica se o produto existe: 

    async execute(data: CreateProductRequest) {
        
        const product = await prismaClient.product.findFirst({
            where: {
                code: data.code
            }
        })

        if (product) throw new Error('Product already exists!')
        
        const productCreated = await prismaClient.product.create({
            data: {
                ...data
            }
        })

        // quando um produto é criado, enviará uma mensagem para os pedidos
        const kafkaMessage = new KafkaSendMessage(); //resposnsavel por enviar a mensagem
        await kafkaMessage.execute('PRODUCT_CREATED', { // pega o topico (broker) da mensageria e envia os valores importantes
            id: productCreated.id,
            code: productCreated.code
        })

        //o que a gente envia para o tópico é algo que é conversável com as equipes,
            // ou seja, as equieps defineem o q devem ser enviados para a comunicação

        return productCreated
    }
}