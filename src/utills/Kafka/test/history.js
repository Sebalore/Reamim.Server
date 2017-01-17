'use strict';

const historyReq = {
    header: {
        messageCounter: 1,
        timetag: new Date().getTime(),
        schemaName: "GetHistoryRequestTopic",
        schemaVersion:	'1.3.0'
    },
    layerName: "Flock",
    filter: {
        geoFilter: null,
        lastNEntries: 10,
        timeFilter: null
    }
};

var avro = require('avsc'),
    AvroSerializer = require('./../avroSerializer'),
    RequestResponseProducer = require('./../request_response/producer'),

    requestSchema = avro.parse('./test/avsc/GetHistoryRequestMessage.avsc'),
    serializer = new AvroSerializer(requestSchema),

    responseSchema = avro.parse('./test/avsc/FlockMessage.avsc'),
    deserializer = new AvroSerializer(responseSchema),

    options = {
        groupId: 'REPLY_FLOCK_GROUP',
        fetchMaxWaitMs: 1000,
        fetchMaxBytes: 1024 * 1024
    },
    producerPromise = new RequestResponseProducer('10.135.192.33:2181', serializer, deserializer, options, 'ReplyFlockTopic');

producerPromise.then(producer =>
    setInterval(() => {
        producer.send('GetHistoryRequestTopic', historyReq)
            .then(iter => {
                for (let p of iter) {
                    p.then(m => console.log(m));
                }
            })
            .catch(err => console.log(err));
    }, 3000));
