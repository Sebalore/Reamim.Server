/**
 * Created by ALONHA on 11/08/2016.
 */
'use strict';
var kafka = require('kafka-node'),
    HighLevelConsumer = kafka.HighLevelConsumer;

class ConsumerFacade {

    constructor(connectionString, topic, options, serializer) {

        options.autoCommit = true;
        options.encoding = 'buffer';
        options.sessionTimeout = 10 * 1000;

        var highLevelConsumer = new HighLevelConsumer(new kafka.Client(connectionString), [{topic: topic}], options);

        var consumer = {

            subscribe (onmessage, onerror) {

                highLevelConsumer.on('message', rec => {
                    let msg = serializer.deserialize(rec.value);
                    onmessage(msg);
                });

                highLevelConsumer.on('error', err => onerror(err));
            },

            close (cb) {
                highLevelConsumer.close(true, cb);
            }
        };

        return consumer;
    }
}

export default ConsumerFacade;