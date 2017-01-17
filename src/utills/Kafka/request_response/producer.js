'use strict';
var ProducerFacade = require('../producerFacade'),
    CompletionMap = require('./completionMap'),
    AvroSerializer = require('../avroSerializer'),
    UUID = require('../uuid');

class RequestResponseProducer {

    constructor(connectionString, serializer, deserializer, options, optionalReplyTopic) {

        var producerPromise = new ProducerFacade(connectionString, new AvroSerializer(AvroSerializer.envelopeSchema())),
            completionMap = new CompletionMap(connectionString, deserializer, options, optionalReplyTopic);

        return new Promise((resolve, reject) => {

            producerPromise
                .then(producer => resolve(
                    {
                        send (topic, message) {

                            return new Promise((resolve, reject) => {

                                var correlationKey = UUID.randomUUID(),
                                    request = {
                                        payload: serializer.serialize(message),
                                        correlation_key: correlationKey,
                                        reply_topic: completionMap.replyTopic,
                                        exception: '',
                                        total_messages: -1
                                    },
                                    cb = (err, data) => err ? reject(err) : resolve(data);

                                completionMap.set(correlationKey, cb);

                                producer.send(topic, request);
                            });
                        },

                        close() {
                            completionMap.close();
                        }
                    }))
                .catch(e => reject(e));
        });
    }
}

module.exports = RequestResponseProducer;