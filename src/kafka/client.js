const { Kafka, logLevel } = require('kafkajs');

const kafka = new Kafka({
    logLevel: logLevel.NOTHING,
    clientId: 'learn-kafka',
    brokers: ['localhost:9092', 'localhost:9093'],
});

module.exports = kafka;
