const amqp = require('amqplib');
const QUEUE_OPTION = {
    arguments: {
        "x-max-priority": 100,
    }
};

const QUEUE_NAME = 'test';

const consume = async () => {
    try {
        const conn = await amqp.connect('amqp://test:pass@localhost:5672');
        const channel = await conn.createChannel();
        await channel.assertQueue(QUEUE_NAME, QUEUE_OPTION);

        console.log("Waiting for messages in %s. To exit press CTRL+C", QUEUE_NAME);
        let previous;
        const keeper = [];

        channel.consume(QUEUE_NAME, function (msg) {
            const digit = msg.content.toString();
            const int = parseInt(digit);
            console.log("Received: ", digit);

            if(!previous) {
                previous = int;
            }
            if (previous - int > 1 || (previous - int === 1 && keeper.includes(int))) {
                throw new Error("priority failure - prev: " + previous + ' int: ' + int)
            }
            previous = int;
            keeper.push(int);
        });

    } catch (error) {
        console.log(error);
    }
}

consume();