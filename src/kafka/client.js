const { Kafka, logLevel } = require('kafkajs');

const kafka = new Kafka({
    logLevel: logLevel.NOTHING,
    clientId: 'learn-kafka',
    brokers: ['localhost:9092'],
    
});

module.exports = kafka;
