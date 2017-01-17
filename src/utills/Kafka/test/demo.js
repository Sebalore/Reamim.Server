'use strict';
var avro = require('avsc'),
    AvroSerializer = require('../avroSerializer'),

    specificSchema = avro.parse('./test/avsc/sigint.avsc'),
    specificSerializer = new AvroSerializer(specificSchema),

    ProducerFacade = require('../producerFacade'),
    producerPromise = new ProducerFacade('127.0.0.1:2181', specificSerializer),

    ConsumerFacade = require('../consumerFacade'),
    options = {
        groupId: 'nodeGroupId',
        fetchMaxWaitMs: 1000,
        fetchMaxBytes: 1024 * 1024
    },
    consumer = new ConsumerFacade('127.0.0.1:2181', 'NodeDemoTopic', options, specificSerializer);
//UUID = require('../uuid');


/*var msg = {
 payload: specificSerializer.serialize({body: 'Hello there!'}),
 correlation_key: UUID.randomUUID(),
 reply_topic: 'DUMMY_TOPIC',
 exception: 'none'
 };*/

let sig = {
    timestamp: (new Date).getTime(),
    frequency: 200,
    center_longitude: parseInt((Math.random() * 100).toFixed(2)),
    center_latitude: parseInt((Math.random() * 100).toFixed(2)),
    center_altitude: parseInt((Math.random() * 100).toFixed(2)),
    half_axis_long: 200,
    location_quality: 'DDOP_1',
    reliable: true
}

console.log(sig);

var cb = msg => console.log(msg);
consumer.subscribe(cb, cb);
setTimeout(() => consumer.close(() => process.exit()), 1 * 20 * 1000);

producerPromise.then(producer =>
    setInterval(() => producer.send('NodeDemoTopic', sig)
        .catch(err => 'error: ' + console.log(err)), 1000));



