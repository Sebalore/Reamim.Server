/**
 * Created by ALONHA on 11/08/2016.
 */
'use strict';
var ConsumerFacade = require('../consumerFacade'),
    ProducerFacade = require('../producerFacade'),
    AvroSerializer = require('../avroSerializer');

class RequestResponseConsumer {

    constructor(connectionString, topic, options, deserializer, serializer) {

        var genericSerializer = new AvroSerializer(AvroSerializer.envelopeSchema()),
            consumer = new ConsumerFacade(connectionString, topic, options, genericSerializer),
            producerPromise = new ProducerFacade(connectionString, genericSerializer);

        return new Promise((resolve, reject) => {

            producerPromise
                .then(producer => resolve(
                    {
                        subscribe (func) {

                            consumer.subscribe(envelope => {

                                var req = deserializer.deserialize(envelope.payload);

                                try {
                                    var messages = func(req);

                                    if (messages.length > 0) {

                                        for (let msg of messages) {

                                            var response = {
                                                payload: serializer.serialize(msg),
                                                correlation_key: envelope.correlation_key,
                                                reply_topic: '',
                                                exception: '',
                                                total_messages: messages.length
                                            };

                                            producer.send(envelope.reply_topic, response);
                                        }
                                    } else {

                                        var empty = {
                                            payload: new Buffer(0),
                                            correlation_key: envelope.correlation_key,
                                            reply_topic: '',
                                            exception: '',
                                            total_messages: 0
                                        };

                                        producer.send(envelope.reply_topic, empty);
                                    }

                                } catch (e) {

                                    var err = {
                                        payload: new Buffer(0),
                                        correlation_key: envelope.correlation_key,
                                        reply_topic: '',
                                        exception: e.toString(),
                                        total_messages: -1 /* error indication */
                                    };

                                    producer.send(envelope.reply_topic, err);
                                }

                            }, err => console.error(err));
                        },

                        close (cb) {
                            consumer.close(cb);
                        }
                    }))
                .catch(err => reject(err));
        });
    }
}

module.exports = RequestResponseConsumer;