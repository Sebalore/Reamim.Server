"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require("babel-runtime/core-js/object/keys");

var _Object$keys = _interopRequireDefault(_keys).default;

var _regenerator = require("babel-runtime/regenerator");

var _regeneratorRuntime = _interopRequireDefault(_regenerator).default;

exports.createLinearCoordinatesGenerator = createLinearCoordinatesGenerator;
exports.isPointIsInsideCircle = isPointIsInsideCircle;
exports.defined = defined;
exports.isEmptyObject = isEmptyObject;
exports.getDistanceBetweenPoints = getDistanceBetweenPoints;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createLinearCoordinatesGenerator(velocity) {
    return _regeneratorRuntime.mark(function _callee(origin) {
        var forever, currentPosition, i;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        forever = true;

                    case 1:
                        if (!forever) {
                            _context.next = 15;
                            break;
                        }

                        currentPosition = origin;
                        i = 0;

                    case 4:
                        if (!(i < 32)) {
                            _context.next = 13;
                            break;
                        }

                        currentPosition.longitude += velocity.longitude;
                        currentPosition.latitude += velocity.latitude;
                        currentPosition.height += velocity.height;

                        _context.next = 10;
                        return currentPosition;

                    case 10:
                        i++;
                        _context.next = 4;
                        break;

                    case 13:
                        _context.next = 1;
                        break;

                    case 15:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    });
}

/**
 * check if a given point is in circle
 * @param {Number} pointX  
 * @param {Number} pointY 
 * @param {Number} circleCenterX 
 * @param {Number} circleCenterY 
 * @param {Number} circleRadius 
 */
function isPointIsInsideCircle(pointX, pointY, circleCenterX, circleCenterY, circleRadius) {
    var xDistance = pointX - circleCenterX,
        yDistance = pointY - circleCenterY,
        // simply calculate d = √[(xp−xc)2+(yp−yc)2]
    distanceBetweenPoints = Math.sqrt(xDistance * xDistance + yDistance * yDistance);

    return distanceBetweenPoints < circleRadius;
}

function defined(object) {
    return object !== undefined && object !== null;
}

/**
 * @param {Object} obj
 */
function isEmptyObject(obj) {
    return _Object$keys(obj).length === 0 && obj.constructor === Object;
}

function getDistanceBetweenPoints(point1, point2) {
    // const φ1 = lat1.toRadians();
    // const φ2 = lat2.toRadians();
    // const Δφ = (lat2-lat1).toRadians();
    // const Δλ = (lon2-lon1).toRadians();

    var φ1 = point1.latitude;
    var φ2 = point2.latitude;
    var Δφ = point2.latitude - point1.latitude;
    var Δλ = point2.longitude - point1.longitude;
    var R = 6371e3; // metres


    var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var d = R * c;

    return d;
}
//# sourceMappingURL=services.js.map