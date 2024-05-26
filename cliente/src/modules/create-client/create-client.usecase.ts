import { prismaClient } from "../../infra/database/prismaClient"
import { kafka } from "../../infra/provider/kafka"
import { KafkaSendMessage } from "../../infra/provider/kafka/producer"

type CreateClientRequest = {
    nome: string,
    password: string,
    email: string,
    phone: string
}

export class CreateClientUseCase {
    constructor () {}

    async execute (data: CreateClientRequest)  {
        // cadastrar clientes no db

        //verifica se o email está salvo, se n ele cria

        const costomer = await prismaClient.client.findFirst({
            where: {
                email: data.email
            }
        })

        if(costomer) throw new Error('Customer alread exixsts!')

        // se não existir email ele cria um novo
        const customerCreated = await prismaClient.client.create({
            data: {
                ...data,
            },
        })

        const kafkaProducer = new KafkaSendMessage()
        await kafkaProducer.execute('CUSTOMER_CREATED', {
            id: customerCreated.id,
            email: customerCreated.email
        })

        return customerCreated
    }
}