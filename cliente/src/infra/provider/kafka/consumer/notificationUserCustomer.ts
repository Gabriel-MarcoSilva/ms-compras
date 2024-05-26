// vai ler/consumir a mensagem

import { kafkaConsumer } from "./kafka.consumer";

type customerConsumer = {
    customerId: string,
    status: string
}

export async function createCustomerConsumer () {
     const consumer = await kafkaConsumer("ORDER_STATUS") //topic  será ouvido

     //função run serve para receber um array de mensagens

     await consumer.run({
        eachMessage: async ({message}) => {
            const messageToString = message.value!.toString()
            const statusConsumer = JSON.parse(messageToString) as customerConsumer

            //enviar mensagem por email
            console.log(`ATUALIZAÇÃO DE STATUS - Cliente: ${statusConsumer.customerId} - Status: ${statusConsumer.status}`)
        }
     })
}

// recursividade que chama a função novamente pra ficar escuntando sempre pra caso tenham novas mensagens na fila
createCustomerConsumer()