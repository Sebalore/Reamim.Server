'use strict';
var AvroSerializer = require('../avroSerializer'),
    ConsumerFacade = require('../consumerFacade'),
    CompletionItem = require('./completionItem'),
    UUID = require('../uuid'),
    defaultReplyTopic = 'REPLY_TOPIC_' + UUID.randomUUID();

class CompletionMap {

    constructor(connectionString, deserializer, options, optionalReplyTopic) {

        this.replyTopic = optionalReplyTopic || defaultReplyTopic;

        var consumer = new ConsumerFacade(connectionString, this.replyTopic, options, new AvroSerializer(AvroSerializer.envelopeSchema()));

        consumer.subscribe(envelope => this.completionHandler(envelope), err => console.log(err));

        this.completionMap = new Map();

        var self = this;

        return {

            set(correlationKey, cb) {

                let item = new CompletionItem(cb, deserializer);

                self.completionMap.set(correlationKey, item);
            },

            get replyTopic() {
                return self.replyTopic;
            }
        };
    }

    completionHandler(envelope) {
        let key = envelope.correlation_key;

        if (this.completionMap.has(key)) {

            let completionItem = this.completionMap.get(key);

            if (!completionItem.add(envelope)) {
                this.completionMap.delete(key);
            }
        }
    }

    close() {
        this.consumer.close(() => {
        });
    }
}

module.exports = CompletionMap;