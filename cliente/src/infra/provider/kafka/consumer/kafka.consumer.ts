import { kafka } from ".."

export const kafkaConsumer = async (topic: string) => {
    const consumer = kafka.consumer({groupId: 'CUSTOMER_APP'}) //groupId só será lido uma vez, utilizado por API, diz que leu ou não a mensagem
    await consumer.connect()

    await consumer.subscribe({topic, fromBeginning: true}) //frombeginning serve para fazer a leitura com todos os itens da fila que não foram lidas

    return consumer
}