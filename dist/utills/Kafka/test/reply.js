'use strict';

var requestSchema$ = '{\n      "type": "record",\n      "name": "TestRequest",\n      "fields": [\n        {\n          "name": "request",\n          "type": "string"\n        }\n      ]\n    }';

var responseSchema$ = '{\n      "type": "record",\n      "name": "TestResponse",\n      "fields": [\n        {\n          "name": "index",\n          "type": "int"\n        }\n      ]\n    }';

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

var func = function func(msg) {
    console.log("Handling: " + msg);

    var arr = [1, 2, 3];
    //return [];
    //throw 'boo';

    return arr.map(function (i) {
        return {
            index: i
        };
    });
};

consumerPromise.then(function (consumer) {
    consumer.subscribe(func);
    setTimeout(function () {
        return consumer.close(function () {
            return process.exit();
        });
    }, 0.5 * 60 * 1000);
});

producerPromise.then(function (producer) {
    return setInterval(function () {
        producer.send('REQRES_DEMO_TOPIC', { request: 'I am a request' }).then(function (iter) {
            console.log('length: ' + iter.length);
            iter.forEach(function (promise) {
                return promise.then(function (m) {
                    return console.log(m);
                });
            });
        }).catch(function (err) {
            return console.log('err: ' + err);
        });
    }, 3000);
});

/*producerPromise1.then(producer =>
    setInterval(() => {
        producer.send('REQRES_DEMO_TOPIC', {request: 'I am a request #1'})
            .then(iter => console.log('I am a response #1'))
            .catch(err => console.error(err));
    }, 3000));*/
//# sourceMappingURL=reply.js.map