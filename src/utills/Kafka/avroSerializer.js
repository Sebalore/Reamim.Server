'use strict';
var avro = require('avsc');

const envelope$ = `{
  "namespace": "com.r39.avro",
  "name": "KafkaRequestResponseEnvelope",
  "type": "record",
  "fields": [
    { "name": "payload", "type": "bytes", "doc": "The actual message decoded into byte array." },
    { "name": "correlation_key", "type": "string", "doc": "A key which correlates a response to request." },
    { "name": "reply_topic", "type": ["null", "string"], "default": null, "doc": "Optional field. Provided only if this is a request message." },
    { "name": "exception", "type": ["null", "string"], "default": null, "doc": "Optional field. Response timeout or failure." },
    { "name": "total_messages", "type": ["null", "int"], "default": null, "doc": "Optional field. The total messages in the response." }
  ]
}`;

const envelopeSchema = avro.parse(envelope$);

class AvroSerializer {

    constructor(type /*topic - TODO: schema registry lookup based on topic */) {
        this.type = type;
    }

    serialize(message) {

        if (!this.type.isValid(message)) {
            throw Error('The message must conform schema:' + this.type.toString());
        }

        return this.type.toBuffer(message);
    }

    deserialize(buff) {
        return this.type.fromBuffer(buff);
    }

    static envelopeSchema() {
        return envelopeSchema;
    }
}

export default AvroSerializer;