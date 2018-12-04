const amqp = require('amqplib');

const QUEUE_NAME = 'test';
const QUEUE_OPTIONS = {
  arguments: {
    "x-max-priority": 100,
  }
};

let priorityValue = 0;
let msg = 'Hello World!';

async function main() {
    try {
        const conn = await amqp.connect('amqp://test:pass@localhost:5672');
        const channel = await conn.createChannel();
        await channel.assertQueue(QUEUE_NAME, QUEUE_OPTIONS);
        for (let i = 0; i < 100; i++) {
            msg = priorityValue;
            if(priorityValue % 2 === 0)
            {
                for (let j = 0; j < 3; j++) {
                    await channel.sendToQueue(QUEUE_NAME, new Buffer(msg.toString()), { priority:priorityValue });
                    msg = priorityValue;
                    console.log(msg);
                }
            }
            await channel.sendToQueue(QUEUE_NAME, new Buffer(msg.toString()), { priority:priorityValue });
            console.log(msg);
            priorityValue = i;
        }

    } catch (error) {
        console.log(error);
    }
};

for (let y = 0; y < 10; y++) {
    main();
}