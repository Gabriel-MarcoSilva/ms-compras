// vai ler/consumir a mensagem

import { prismaClient } from "../../../database/prismaClient";
import { kafkaConsumer } from "./kafka.consumer";

type customerConsumer = {
    email: string,
    id: string
}

export async function createCustomerConsumer() {
    const consumer = await kafkaConsumer("CUSTOMER_CREATED") //topic  será ouvido

    //função run serve para receber um array de mensagens

    await consumer.run({
        eachMessage: async ({ message }) => {
            const messageToString = message.value!.toString()
            const customer = JSON.parse(messageToString) as customerConsumer

            await prismaClient.customer.create({ //salva no sistema de mensageria
                data: {
                    externalId: customer.id,
                    email: customer.email
                }
            })
        }
    })
}

// recursividade que chama a função novamente pra ficar escuntando sempre pra caso tenham novas mensagens na fila
createCustomerConsumer()