'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator = _interopRequireDefault(_getIterator2).default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var historyReq = {
    header: {
        messageCounter: 1,
        timetag: new Date().getTime(),
        schemaName: "GetHistoryRequestTopic",
        schemaVersion: '1.3.0'
    },
    layerName: "Flock",
    filter: {
        geoFilter: null,
        lastNEntries: 10,
        timeFilter: null
    }
};

var avro = require('avsc'),
    AvroSerializer = require('./../avroSerializer'),
    RequestResponseProducer = require('./../request_response/producer'),
    requestSchema = avro.parse('./test/avsc/GetHistoryRequestMessage.avsc'),
    serializer = new AvroSerializer(requestSchema),
    responseSchema = avro.parse('./test/avsc/FlockMessage.avsc'),
    deserializer = new AvroSerializer(responseSchema),
    options = {
    groupId: 'REPLY_FLOCK_GROUP',
    fetchMaxWaitMs: 1000,
    fetchMaxBytes: 1024 * 1024
},
    producerPromise = new RequestResponseProducer('10.135.192.33:2181', serializer, deserializer, options, 'ReplyFlockTopic');

producerPromise.then(function (producer) {
    return setInterval(function () {
        producer.send('GetHistoryRequestTopic', historyReq).then(function (iter) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = _getIterator(iter), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var p = _step.value;

                    p.then(function (m) {
                        return console.log(m);
                    });
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
        }).catch(function (err) {
            return console.log(err);
        });
    }, 3000);
});
//# sourceMappingURL=history.js.map