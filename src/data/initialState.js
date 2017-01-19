import { createLinearCoordinatesGenerator } from '../utills/services';
import resources from './resources';
import Guid from 'guid';

export default  {
  entityTypes: [
    {
      name: resources.ENTITY_TYPE_NAMES.FLIGHT_CIRCLE_IN,
      active: true,
      entities: []
    }, 
    {
      name: resources.ENTITY_TYPE_NAMES.DMA,
      active: true,
      entities: []
    }, 
    {
      name: resources.ENTITY_TYPE_NAMES.AIRPLANE,
      active: true,
      entities: [
        {
          id: Guid.create(), //serial number on planes tail;
          label: `${resources.ENTITY_TYPE_NAMES.AIRPLANE}: 001`,
          missionId : 123,
          position: {
            longitude: resources.MAP_CENTER.longitude - 0.075,
            latitude: resources.MAP_CENTER.latitude - 0.04,
            height: 1000.0
          },
          uavData: {
            orientation : {
              yaw : null,
              pitch: null,
              roll : null
            },
            windData: {
              direction: null,
              speed : null
            },
            velocity:{
              north : null,
              east: null,
              down: null
            }
          }, 
          gen:  createLinearCoordinatesGenerator({
            longitude: 0.002,
            latitude: 0.001,
            height: 250
          })
        } , {
          id: Guid.create(),
          label: `${resources.ENTITY_TYPE_NAMES.AIRPLANE}: 002`,
           missionId : 777,
          position: {
            longitude: resources.MAP_CENTER.longitude - 0.05,
            latitude: resources.MAP_CENTER.latitude + 0.03,
            height: 1500.0
          },
          uavData: {
            orientation : {
              yaw : null,
              pitch: null,
              roll : null
            },
            windData: {
              direction: null,
              speed : null
            },
            velocity:{
              north : null,
              east: null,
              down: null
            }
          },           
          gen:  createLinearCoordinatesGenerator({
            longitude: 0.001,
            latitude: -0.002,
            height: 250
          })
        }, {
          id: Guid.create(),
          label: `${resources.ENTITY_TYPE_NAMES.AIRPLANE}: 003`,
          position: {
            longitude: resources.MAP_CENTER.longitude + 0.085,
            latitude: resources.MAP_CENTER.latitude + 0.02,
            height: 750.0
          },
          uavData: {
            orientation : {
              yaw : null,
              pitch: null,
              roll : null
            },
            windData: {
              direction: null,
              speed : null
            },
            velocity:{
              north : null,
              east: null,
              down: null
            }
          },           
          gen:  createLinearCoordinatesGenerator({
            longitude: -0.001,
            latitude: -0.00002,
            height: 250
          })
        }
      ]
    }, 
    {
      name: resources.ENTITY_TYPE_NAMES.HELICOPTER,
      active: true,
      entities: [
        {
          id: 'debug111', //Guid.create(),
          label: `${resources.ENTITY_TYPE_NAMES.HELICOPTER}: 001`,
          position: {
            longitude: resources.MAP_CENTER.longitude, 
            latitude: resources.MAP_CENTER.latitude, 
            height: 69.0
          },
          uavData: {
            orientation : {
              yaw : null,
              pitch: null,
              roll : null
            },
            windData: {
              direction: null,
              speed : null
            },
            velocity:{
              north : null,
              east: null,
              down: null
            }
          },           
          gen:  createLinearCoordinatesGenerator({
            longitude: -0.0002,
            latitude: 0.001,
            height: 250
          })
        }, 
        {
          id: Guid.create(),
          label: `${resources.ENTITY_TYPE_NAMES.HELICOPTER}: 002`,
          missionId : 888,
          position: {
            longitude: resources.MAP_CENTER.longitude  + 0.0065,
            latitude: resources.MAP_CENTER.latitude - 0.0085,
            height: 250.0
          },
          uavData: {
            orientation : {
              yaw : null,
              pitch: null,
              roll : null
            },
            windData: {
              direction: null,
              speed : null
            },
            velocity:{
              north : null,
              east: null,
              down: null
            }
          },           
          gen:  createLinearCoordinatesGenerator({
            longitude: 0.00001,
            latitude: -0.0001,
            height: 250
          })
        }
      ]
    }
  ]
};