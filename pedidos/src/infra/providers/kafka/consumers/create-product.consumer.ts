// vai ler/consumir a mensagem

import { prismaClient } from "../../../database/prismaClient";
import { kafkaConsumer } from "./kafka.consumer";

type productConsumer = {
    code: string,
    id: string
}

export async function createProductConsumer() {
    const consumer = await kafkaConsumer("PRODUCT_CREATED") //topic  será ouvido

    //função run serve para receber um array de mensagens

    await consumer.run({
        eachMessage: async ({ message }) => {
            const messageToString = message.value!.toString()
            const product = JSON.parse(messageToString) as productConsumer

            await prismaClient.product.create({ //salva no sistema de mensageria
                data: {
                    externalId: product.id,
                    code: product.code
                }
            })
        }
    })
}

// recursividade que chama a função novamente pra ficar escuntando sempre pra caso tenham novas mensagens na fila
createProductConsumer()