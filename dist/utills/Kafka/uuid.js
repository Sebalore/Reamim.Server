'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var UUID = {
    randomUUID: function randomUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
        });
        return uuid;
    }
};

exports.default = UUID;
//# sourceMappingURL=uuid.js.map