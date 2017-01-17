'use strict';

var _map = require('babel-runtime/core-js/map');

var _Map = _interopRequireDefault(_map).default;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck = _interopRequireDefault(_classCallCheck2).default;

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass = _interopRequireDefault(_createClass2).default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AvroSerializer = require('../avroSerializer'),
    ConsumerFacade = require('../consumerFacade'),
    CompletionItem = require('./completionItem'),
    UUID = require('../uuid'),
    defaultReplyTopic = 'REPLY_TOPIC_' + UUID.randomUUID();

var CompletionMap = function () {
    function CompletionMap(connectionString, deserializer, options, optionalReplyTopic) {
        var _this = this;

        _classCallCheck(this, CompletionMap);

        this.replyTopic = optionalReplyTopic || defaultReplyTopic;

        var consumer = new ConsumerFacade(connectionString, this.replyTopic, options, new AvroSerializer(AvroSerializer.envelopeSchema()));

        consumer.subscribe(function (envelope) {
            return _this.completionHandler(envelope);
        }, function (err) {
            return console.log(err);
        });

        this.completionMap = new _Map();

        var self = this;

        return {
            set: function set(correlationKey, cb) {

                var item = new CompletionItem(cb, deserializer);

                self.completionMap.set(correlationKey, item);
            },


            get replyTopic() {
                return self.replyTopic;
            }
        };
    }

    _createClass(CompletionMap, [{
        key: 'completionHandler',
        value: function completionHandler(envelope) {
            var key = envelope.correlation_key;

            if (this.completionMap.has(key)) {

                var completionItem = this.completionMap.get(key);

                if (!completionItem.add(envelope)) {
                    this.completionMap.delete(key);
                }
            }
        }
    }, {
        key: 'close',
        value: function close() {
            this.consumer.close(function () {});
        }
    }]);

    return CompletionMap;
}();

module.exports = CompletionMap;
//# sourceMappingURL=completionMap.js.map