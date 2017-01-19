'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty = _interopRequireDefault(_defineProperty2).default;

var _ENTITY_TYPES;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//------LAYERS AND ENTITY TYPES NAMES --------------
var UAV = 'UAV';
var VISINT = 'VISINT';
var SIGINT = 'SIGINT';

var DMA = 'DynamicMissionArea';
var FORBIDEN_FLIGHT_AREA = 'ForbidenFlightArea';
var FLIGHT_AREA = 'FlightArea';
var FLIGHT_CIRCLE = 'FlightCircle'; //layer
var FLIGHT_CIRCLE_IN = 'FlightCircle - Enter'; //entity type
var FLIGHT_CIRCLE_OUT = 'FlightCircle - Exit'; //entity type
var MISSION_TOOLTIP = 'MissionTooltip'; //entity type

//--------------------------------- ------- ACTION NAMES ------------
var ADD = 'ADD';
var DELETE = 'DELETE';
var UPDATE_POSITION = 'UPDATE_POSITION';
var MAP_CENTER = 'MAP_CENTER';
var TOGGLE_ENTITY_TYPE = 'TOGGLE_ENTITY_TYPE';
var SET_ENTITY_CESIUM_ID = 'SET_ENTITY_CESIUM_ID';
var TOGGLE_BEST_FIT_DISPLAY = 'TOGGLE_BEST_FIT_DISPLAY';

//--------------------------------- ------ AGENTS ------------------
var USER = 'USER';
var API = 'API';
//--------------------------------

exports.default = {
    LAYER_NAMES: {
        UAV: UAV,
        DMA: DMA,
        FORBIDEN_FLIGHT_AREA: FORBIDEN_FLIGHT_AREA,
        FLIGHT_AREA: FLIGHT_AREA,
        FLIGHT_CIRCLE: FLIGHT_CIRCLE
    },
    ENTITY_TYPE_NAMES: {
        VISINT: VISINT,
        SIGINT: SIGINT,
        DMA: DMA,
        FORBIDEN_FLIGHT_AREA: FORBIDEN_FLIGHT_AREA,
        FLIGHT_AREA: FLIGHT_AREA,
        FLIGHT_CIRCLE_IN: FLIGHT_CIRCLE_IN,
        FLIGHT_CIRCLE_OUT: FLIGHT_CIRCLE_OUT,
        MISSION_TOOLTIP: MISSION_TOOLTIP
    },
    MAP_CENTER: {
        longitude: 34.99249855493725,
        latitude: 32.79628841345832,
        height: 1.0
    },
    IMG: {
        BASE_URL: 'src/shared/images/',
        SCALE: '25%',
        MAX_WIDTH: '65px',
        MAX_HEIGHT: '45px'
    },
    AGENTS: {
        USER: USER,
        API: API
    },
    ENTITY_TYPES: (_ENTITY_TYPES = {}, _defineProperty(_ENTITY_TYPES, FLIGHT_CIRCLE_IN, {
        LAYER: FLIGHT_CIRCLE,
        IMG: 'icon_1.svg',
        ACTIONS: {
            ADD: {
                ID: 'Add',
                DESC: 'Add a new flight circle.',
                IMG: 'icon_11.svg',
                SCALE: 1
            }
        },
        DISPLAY_OPTIONS: {}
    }), _defineProperty(_ENTITY_TYPES, DMA, {
        LAYER: DMA,
        IMG: 'icon_8.svg',
        ACTIONS: {
            ADD: {
                ID: 'Add',
                DESC: 'Add a new destination point',
                IMG: 'icon_8.svg',
                SCALE: 0.5
            }
        }
    }), _defineProperty(_ENTITY_TYPES, VISINT, {
        IMG: 'icon_5.svg',
        LAYER: UAV,
        ACTIONS: {
            ADD: {
                ID: 'Add',
                DESC: 'Add a new VISINT',
                IMG: 'icon_5_black_1.svg',
                SCALE: 0.5
            }
        }
    }), _defineProperty(_ENTITY_TYPES, SIGINT, {
        IMG: 'icon_3.svg',
        LAYER: UAV,
        ACTIONS: {
            ADD: {
                ID: 'Add',
                DESC: 'Add a new SIGINT',
                IMG: 'icon_3_black_1.svg',
                SCALE: 0.5
            }
        }
    }), _defineProperty(_ENTITY_TYPES, MISSION_TOOLTIP, {
        IMG: 'circle_with_number_inside',
        LAYER: UAV
    }), _ENTITY_TYPES),
    ACTIONS: {
        ADD: {
            TYPE: ADD,
            DESC: 'Add a new entity',
            LAYERS: [DMA, FLIGHT_AREA, FORBIDEN_FLIGHT_AREA, UAV, FLIGHT_CIRCLE], //ON WHAT LAYERS CAN THIS ACTION BE PERFORMED
            AGENTS: [USER, API], //WHOS CAN PERFORM ACTION
            IMG: 'entityType'
        },
        DELETE: {
            TYPE: DELETE,
            DESC: 'Delete an entity',
            LAYERS: [DMA, FLIGHT_AREA, FORBIDEN_FLIGHT_AREA, UAV, FLIGHT_CIRCLE],
            AGENTS: [USER, API],
            IMG: 'icon_7.svg'
        },
        UPDATE_POSITION: {
            TYPE: UPDATE_POSITION,
            DESC: 'Change position coordinates (and rotation?) of entity',
            LAYERS: [DMA, FLIGHT_AREA, FORBIDEN_FLIGHT_AREA, UAV],
            AGENTS: [USER, API]
        },
        MAP_CENTER: {
            TYPE: MAP_CENTER,
            DESC: 'Change map camera view to center on the entity',
            LAYERS: [DMA, FLIGHT_AREA, FORBIDEN_FLIGHT_AREA, UAV, FLIGHT_CIRCLE],
            AGENTS: [USER]
        },
        TOGGLE_ENTITY_TYPE: {
            TYPE: TOGGLE_ENTITY_TYPE,
            DESC: 'Turn on/off layer and/or entity type on the map',
            LAYERS: [DMA, FLIGHT_AREA, FORBIDEN_FLIGHT_AREA, UAV, FLIGHT_CIRCLE],
            AGENTS: [USER, API]
        },
        TOGGLE_BEST_FIT_DISPLAY: {
            TYPE: TOGGLE_BEST_FIT_DISPLAY,
            DESC: 'Turn on/off best fit zoom on object',
            LAYERS: [DMA, FLIGHT_AREA, FORBIDEN_FLIGHT_AREA, FLIGHT_CIRCLE],
            AGENTS: [USER]
        }
    }
};
//# sourceMappingURL=resources.js.map