'use strict';
const requestSchema$ = `{
      "type": "record",
      "name": "TestRequest",
      "fields": [
        {
          "name": "request",
          "type": "string"
        }
      ]
    }`;

const responseSchema$ = `{
      "type": "record",
      "name": "TestResponse",
      "fields": [
        {
          "name": "index",
          "type": "int"
        }
      ]
    }`;

var avro = require('avsc'),
    AvroSerializer = require('./../avroSerializer'),
    requestSchema = avro.parse(requestSchema$),
    serializer = new AvroSerializer(requestSchema),

    responseSchema = avro.parse(responseSchema$),
    deserializer = new AvroSerializer(responseSchema),

    RequestResponseProducer = require('./../request_response/producer'),

    options = {
        groupId: 'REQRES_DEMO_GROUP',
        fetchMaxWaitMs: 1000,
        fetchMaxBytes: 1024 * 1024
    },
    producerPromise = new RequestResponseProducer('localhost:2181', serializer, deserializer, options, 'ReplyResponseTopic'),
    //producerPromise1 = new RequestResponseProducer('localhost:2181', serializer, deserializer, options, 'ReplyResponseTopic1'),

    RequestResponseConsumer = require('./../request_response/consumer'),

    consumerPromise = new RequestResponseConsumer('localhost:2181', 'REQRES_DEMO_TOPIC', options, serializer, deserializer);

var func = msg => {
    console.log("Handling: " + msg);

    let arr = [1, 2, 3];
    //return [];
    //throw 'boo';

    return arr.map(i => {
        return {
            index: i
        };
    });
}

consumerPromise.then(consumer => {
    consumer.subscribe(func);
    setTimeout(() => consumer.close(() => process.exit()), 0.5 * 60 * 1000);
});

producerPromise.then(producer =>
    setInterval(() => {
        producer.send('REQRES_DEMO_TOPIC', {request: 'I am a request'})
            .then(iter => {
                console.log('length: ' + iter.length);
                iter.forEach(promise => promise.then(m => console.log(m)));
            })
            .catch(err => console.log('err: ' + err));
    }, 3000));

/*producerPromise1.then(producer =>
    setInterval(() => {
        producer.send('REQRES_DEMO_TOPIC', {request: 'I am a request #1'})
            .then(iter => console.log('I am a response #1'))
            .catch(err => console.error(err));
    }, 3000));*/



