import { Kafka } from "kafkajs";

const kafka = new Kafka({
    brokers: ['clear-chigger-14451-us1-kafka.upstash.io:9092'],
    ssl: true,
    sasl: {
        mechanism: 'scram-sha-256',
        username: 'Y2xlYXItY2hpZ2dlci0xNDQ1MSSkNLTXUbo0zujMiewJdgjYIxbr8JcIR5kITrc',
        password: 'Y2NlNzJkMGMtZTgxNi00MDExLThlOTctMzY3MTM1MDUzOTJh'
    },
    // logLevel: logLevel.ERROR,
  });

  export { kafka }