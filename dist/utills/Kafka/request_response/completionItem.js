'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _Promise = _interopRequireDefault(_promise).default;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck = _interopRequireDefault(_classCallCheck2).default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CompletionItem = function CompletionItem(cb, deserializer) {
    _classCallCheck(this, CompletionItem);

    var callbacks = [];

    var counter = null;

    return {
        add: function add(envelope) {

            var tot = envelope.total_messages;

            var promises = [];

            if (!counter) {

                switch (tot) {
                    case -1:
                        cb(envelope.exception, null);
                        return false;

                    case 0:
                        // empty result
                        cb(null, promises);
                        return false;

                    default:
                        counter = 0;
                        for (var i = 0; i < tot; i++) {
                            promises.push(new _Promise(function (resolve, reject) {
                                callbacks.push(function (err, data) {
                                    return err ? reject(err) : resolve(data);
                                });
                            }));
                        }
                        cb(null, promises);
                }
            }

            callbacks[counter](null, deserializer.deserialize(envelope.payload));

            return ++counter < tot;
        }
    };
};

module.exports = CompletionItem;
//# sourceMappingURL=completionItem.js.map