/**
 * Created by ALONHA on 11/08/2016.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck = _interopRequireDefault(_classCallCheck2).default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var kafka = require('kafka-node'),
    HighLevelConsumer = kafka.HighLevelConsumer;

var ConsumerFacade = function ConsumerFacade(connectionString, topic, options, serializer) {
    _classCallCheck(this, ConsumerFacade);

    options.autoCommit = true;
    options.encoding = 'buffer';
    options.sessionTimeout = 10 * 1000;

    var highLevelConsumer = new HighLevelConsumer(new kafka.Client(connectionString), [{ topic: topic }], options);

    var consumer = {
        subscribe: function subscribe(onmessage, onerror) {

            highLevelConsumer.on('message', function (rec) {
                var msg = serializer.deserialize(rec.value);
                onmessage(msg);
            });

            highLevelConsumer.on('error', function (err) {
                return onerror(err);
            });
        },
        close: function close(cb) {
            highLevelConsumer.close(true, cb);
        }
    };

    return consumer;
};

exports.default = ConsumerFacade;
//# sourceMappingURL=consumerFacade.js.map