const kafka = require('../kafka/client');
const {
    PartitionAssigners: { roundRobin },
} = require('kafkajs');
async function init() {
    const consumer = kafka.consumer({
        groupId: 'my-group',
        partitionAssigners: [roundRobin],
    });
    await consumer.connect();
    await consumer.subscribe({ topics: ['my-topic'], fromBeginning: true });
    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            console.log(`${topic}: [${topic}]: PART:${partition}:`, message.value.toString());
        },
    });
}

init();
