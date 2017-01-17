'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck = _interopRequireDefault(_classCallCheck2).default;

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass = _interopRequireDefault(_createClass2).default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var avro = require('avsc');

var envelope$ = '{\n  "namespace": "com.r39.avro",\n  "name": "KafkaRequestResponseEnvelope",\n  "type": "record",\n  "fields": [\n    { "name": "payload", "type": "bytes", "doc": "The actual message decoded into byte array." },\n    { "name": "correlation_key", "type": "string", "doc": "A key which correlates a response to request." },\n    { "name": "reply_topic", "type": ["null", "string"], "default": null, "doc": "Optional field. Provided only if this is a request message." },\n    { "name": "exception", "type": ["null", "string"], "default": null, "doc": "Optional field. Response timeout or failure." },\n    { "name": "total_messages", "type": ["null", "int"], "default": null, "doc": "Optional field. The total messages in the response." }\n  ]\n}';

var _envelopeSchema = avro.parse(envelope$);

var AvroSerializer = function () {
    function AvroSerializer(type /*topic - TODO: schema registry lookup based on topic */) {
        _classCallCheck(this, AvroSerializer);

        this.type = type;
    }

    _createClass(AvroSerializer, [{
        key: 'serialize',
        value: function serialize(message) {

            if (!this.type.isValid(message)) {
                throw Error('The message must conform schema:' + this.type.toString());
            }

            return this.type.toBuffer(message);
        }
    }, {
        key: 'deserialize',
        value: function deserialize(buff) {
            return this.type.fromBuffer(buff);
        }
    }], [{
        key: 'envelopeSchema',
        value: function envelopeSchema() {
            return _envelopeSchema;
        }
    }]);

    return AvroSerializer;
}();

exports.default = AvroSerializer;
//# sourceMappingURL=avroSerializer.js.map