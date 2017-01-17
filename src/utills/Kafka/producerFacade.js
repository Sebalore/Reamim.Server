'use strict';
var kafka = require('kafka-node'),
    HighLevelProducer = kafka.HighLevelProducer;

class ProducerFacade {

    constructor(connectionString, serializer) {

        var highLevelProducer = new HighLevelProducer(new kafka.Client(connectionString));

        return new Promise((resolve, reject) => {

            var producer = {

                send (topic, message) {

                    return new Promise((resolve, reject) => {

                        var buff = serializer.serialize(message),
                            payloads = [
                                {topic: topic, messages: buff}
                            ],
                            cb = (err, data) => err ? reject(err) : resolve(data);

                        highLevelProducer.send(payloads, cb);
                    });
                }
            };

            highLevelProducer.on('ready', () => resolve(producer));
            highLevelProducer.on('error', e => reject(e));
        });
    }
}

export default ProducerFacade;