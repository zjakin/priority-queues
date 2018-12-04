npm i 
node index.js

Start producer and publish around 2500 messages.
messages will be published in order:
12345678... 12345678... 12345678... 12345678....

Then run consumer and you will see that order of messages is :

....8888 7777 6666 5555 4444 3333 2222 1111

also you can check that messages are published into queue and are sorted there in priority order

