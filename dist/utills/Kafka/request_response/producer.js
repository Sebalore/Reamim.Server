'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _Promise = _interopRequireDefault(_promise).default;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck = _interopRequireDefault(_classCallCheck2).default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProducerFacade = require('../producerFacade'),
    CompletionMap = require('./completionMap'),
    AvroSerializer = require('../avroSerializer'),
    UUID = require('../uuid');

var RequestResponseProducer = function RequestResponseProducer(connectionString, serializer, deserializer, options, optionalReplyTopic) {
    _classCallCheck(this, RequestResponseProducer);

    var producerPromise = new ProducerFacade(connectionString, new AvroSerializer(AvroSerializer.envelopeSchema())),
        completionMap = new CompletionMap(connectionString, deserializer, options, optionalReplyTopic);

    return new _Promise(function (resolve, reject) {

        producerPromise.then(function (producer) {
            return resolve({
                send: function send(topic, message) {

                    return new _Promise(function (resolve, reject) {

                        var correlationKey = UUID.randomUUID(),
                            request = {
                            payload: serializer.serialize(message),
                            correlation_key: correlationKey,
                            reply_topic: completionMap.replyTopic,
                            exception: '',
                            total_messages: -1
                        },
                            cb = function cb(err, data) {
                            return err ? reject(err) : resolve(data);
                        };

                        completionMap.set(correlationKey, cb);

                        producer.send(topic, request);
                    });
                },
                close: function close() {
                    completionMap.close();
                }
            });
        }).catch(function (e) {
            return reject(e);
        });
    });
};

module.exports = RequestResponseProducer;
//# sourceMappingURL=producer.js.map