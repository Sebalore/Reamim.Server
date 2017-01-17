'use strict';
import avro from 'avsc';
import AvroSerializer  from '../avroSerializer';
import ProducerFacade from '../producerFacade';
import ConsumerFacade from '../consumerFacade';
// import UUID from '../uuid';
import resources from '../../../data/resources';

const 
    avscSchema$ =`{
        "namespace": "com.r39.avro",
        "name": "UAVPosition",
        "type": "record",
        "fields": [
            { "name": "timestamp", "type": "long" },
            { "name": "id", "type": "string", "doc": "ID of UAV , tail serial number." },
            { "name": "type", "type": "string", "doc": "UAV type." },
            { "name": "longitude", "type": "double" },
            { "name": "latitude", "type": "double" },
            { "name": "height", "type": "double" }
        ]
    }`,
    specificSchema = avro.parse(avscSchema$),
    specificSerializer = new AvroSerializer(specificSchema),
    producerPromise = new ProducerFacade('127.0.0.1:2181', specificSerializer),
    options = {
        groupId: 'nodeGroupId',
        fetchMaxWaitMs: 1000,
        fetchMaxBytes: 1024 * 1024
    },
    consumer = new ConsumerFacade('127.0.0.1:2181', 'UAVPositionTopic', options, specificSerializer),

    testUAV =    {
        id: 'debug123', 
        label: `${resources.ENTITY_TYPE_NAMES.SIGINT}: 001`,
        position: {
            longitude: resources.MAP_CENTER.longitude, 
            latitude: resources.MAP_CENTER.latitude, 
            height: 69.0
        },
        velocity:  {
            longitude: -0.0002,
            latitude: 0.001,
            height: 25
        }
    };

let UAVData = {
    timestamp: (new Date).getTime(),
    id: testUAV.id,
    type: resources.ENTITY_TYPE_NAMES.SIGINT,
    longitude: testUAV.position.longitude,
    latitude: testUAV.position.latitude,
    height: testUAV.position.height
}

const UAVPositionTest = {
    Subscribe : (onMessage, onError) => {
        console.log(UAVData);
        var onMessage = onMessage || (msg => console.log(msg)),
        onError = onError || (msg => console.log(msg));
    
        consumer.subscribe(onMessage, onError);
        setTimeout(() => consumer.close(() => process.exit()), 1 * 25 * 5000);
    },
    Start: () => {
        producerPromise.then(producer =>
        setInterval(() => {
            UAVData.longitude += testUAV.velocity.longitude;
            UAVData.latitude += testUAV.velocity.latitude;
            UAVData.height += testUAV.velocity.height;        
            producer.send('UAVPositionTopic', UAVData).catch(err => 'error: ' + console.log(err));
        }, 5000));
    }
};

export default UAVPositionTest;
 




