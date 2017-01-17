/**
 * Created by ALONHA on 11/08/2016.
 */
'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator = _interopRequireDefault(_getIterator2).default;

var _promise = require('babel-runtime/core-js/promise');

var _Promise = _interopRequireDefault(_promise).default;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck = _interopRequireDefault(_classCallCheck2).default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConsumerFacade = require('../consumerFacade'),
    ProducerFacade = require('../producerFacade'),
    AvroSerializer = require('../avroSerializer');

var RequestResponseConsumer = function RequestResponseConsumer(connectionString, topic, options, deserializer, serializer) {
    _classCallCheck(this, RequestResponseConsumer);

    var genericSerializer = new AvroSerializer(AvroSerializer.envelopeSchema()),
        consumer = new ConsumerFacade(connectionString, topic, options, genericSerializer),
        producerPromise = new ProducerFacade(connectionString, genericSerializer);

    return new _Promise(function (resolve, reject) {

        producerPromise.then(function (producer) {
            return resolve({
                subscribe: function subscribe(func) {

                    consumer.subscribe(function (envelope) {

                        var req = deserializer.deserialize(envelope.payload);

                        try {
                            var messages = func(req);

                            if (messages.length > 0) {
                                var _iteratorNormalCompletion = true;
                                var _didIteratorError = false;
                                var _iteratorError = undefined;

                                try {

                                    for (var _iterator = _getIterator(messages), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                        var msg = _step.value;


                                        var response = {
                                            payload: serializer.serialize(msg),
                                            correlation_key: envelope.correlation_key,
                                            reply_topic: '',
                                            exception: '',
                                            total_messages: messages.length
                                        };

                                        producer.send(envelope.reply_topic, response);
                                    }
                                } catch (err) {
                                    _didIteratorError = true;
                                    _iteratorError = err;
                                } finally {
                                    try {
                                        if (!_iteratorNormalCompletion && _iterator.return) {
                                            _iterator.return();
                                        }
                                    } finally {
                                        if (_didIteratorError) {
                                            throw _iteratorError;
                                        }
                                    }
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
                    }, function (err) {
                        return console.error(err);
                    });
                },
                close: function close(cb) {
                    consumer.close(cb);
                }
            });
        }).catch(function (err) {
            return reject(err);
        });
    });
};

module.exports = RequestResponseConsumer;
//# sourceMappingURL=consumer.js.map