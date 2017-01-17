'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _Promise = _interopRequireDefault(_promise).default;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck = _interopRequireDefault(_classCallCheck2).default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var kafka = require('kafka-node'),
    HighLevelProducer = kafka.HighLevelProducer;

var ProducerFacade = function ProducerFacade(connectionString, serializer) {
    _classCallCheck(this, ProducerFacade);

    var highLevelProducer = new HighLevelProducer(new kafka.Client(connectionString));

    return new _Promise(function (resolve, reject) {

        var producer = {
            send: function send(topic, message) {

                return new _Promise(function (resolve, reject) {

                    var buff = serializer.serialize(message),
                        payloads = [{ topic: topic, messages: buff }],
                        cb = function cb(err, data) {
                        return err ? reject(err) : resolve(data);
                    };

                    highLevelProducer.send(payloads, cb);
                });
            }
        };

        highLevelProducer.on('ready', function () {
            return resolve(producer);
        });
        highLevelProducer.on('error', function (e) {
            return reject(e);
        });
    });
};

exports.default = ProducerFacade;
//# sourceMappingURL=producerFacade.js.map