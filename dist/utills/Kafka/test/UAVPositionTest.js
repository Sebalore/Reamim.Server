'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck = _interopRequireDefault(_classCallCheck2).default;

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass = _interopRequireDefault(_createClass2).default;

var _avsc = require('avsc');

var avro = _interopRequireDefault(_avsc).default;

var _avroSerializer = require('../avroSerializer');

var AvroSerializer = _interopRequireDefault(_avroSerializer).default;

var _producerFacade = require('../producerFacade');

var ProducerFacade = _interopRequireDefault(_producerFacade).default;

var _consumerFacade = require('../consumerFacade');

var ConsumerFacade = _interopRequireDefault(_consumerFacade).default;

var _resources = require('../../../data/resources');

var resources = _interopRequireDefault(_resources).default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var avscSchema$ = '{\n        "namespace": "com.r39.avro",\n        "name": "UAVPosition",\n        "type": "record",\n        "fields": [\n            { "name": "timestamp", "type": "long" },\n            { "name": "id", "type": "string", "doc": "ID of UAV , tail serial number." },\n            { "name": "type", "type": "string", "doc": "UAV type." },\n            { "name": "longitude", "type": "double" },\n            { "name": "latitude", "type": "double" },\n            { "name": "height", "type": "double" }\n        ]\n    }',
    specificSchema = avro.parse(avscSchema$),
    specificSerializer = new AvroSerializer(specificSchema),
    producerPromise = new ProducerFacade('127.0.0.1:2181', specificSerializer),
    options = {
    groupId: 'nodeGroupId',
    fetchMaxWaitMs: 1000,
    fetchMaxBytes: 1024 * 1024
},
    consumer = new ConsumerFacade('127.0.0.1:2181', 'UAVPositionTopic', options, specificSerializer),
    testUAV = {
    id: 'debug123',
    label: resources.ENTITY_TYPE_NAMES.HELICOPTER + ': 001',
    position: {
        longitude: resources.MAP_CENTER.longitude,
        latitude: resources.MAP_CENTER.latitude,
        height: 69.0
    },
    velocity: {
        longitude: -0.0002,
        latitude: 0.001,
        height: 250
    }
};
// import UUID from '../uuid';


var UAVData = {
    timestamp: new Date().getTime(),
    id: testUAV.id,
    type: resources.ENTITY_TYPE_NAMES.HELICOPTER,
    longitude: testUAV.position.longitude,
    latitude: testUAV.position.latitude,
    height: testUAV.position.height
};

var UAVPositionTest = function () {
    function UAVPositionTest() {
        _classCallCheck(this, UAVPositionTest);
    }

    _createClass(UAVPositionTest, [{
        key: 'Subscribe',
        value: function Subscribe(onMessage, onError) {
            console.log(UAVData);
            var onMessage = onMessage || function (msg) {
                return console.log(msg);
            },
                onError = onError || function (msg) {
                return console.log(msg);
            };

            consumer.subscribe(onMessage, onError);
            setTimeout(function () {
                return consumer.close(function () {
                    return process.exit();
                });
            }, 1 * 20 * 1000);
        }
    }, {
        key: 'Start',
        value: function Start() {
            producerPromise.then(function (producer) {
                return setInterval(function () {
                    UAVData.longitude += testUAV.velocity.longitude;
                    UAVData.latitude += testUAV.velocity.latitude;
                    UAVData.height += testUAV.velocity.height;
                    producer.send('UAVPositionTopic', UAVData).catch(function (err) {
                        return 'error: ' + console.log(err);
                    });
                }, 1000);
            });
        }
    }]);

    return UAVPositionTest;
}();

exports.default = UAVPositionTest;
;
//# sourceMappingURL=UAVPositionTest.js.map