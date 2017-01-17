'use strict';
class CompletionItem {

    constructor(cb, deserializer) {

        var callbacks = [];

        var counter = null;

        return {

            add(envelope) {

                let tot = envelope.total_messages;

                let promises = [];

                if (!counter) {

                    switch (tot) {
                        case -1:
                            cb(envelope.exception, null);
                            return false;

                        case 0: // empty result
                            cb(null, promises)
                            return false;

                        default:
                            counter = 0;
                            for (let i = 0; i < tot; i++) {
                                promises.push(new Promise((resolve, reject) => {
                                    callbacks.push((err, data) => err ? reject(err) : resolve(data));
                                }));
                            }
                            cb(null, promises);
                    }
                }

                callbacks[counter](null, deserializer.deserialize(envelope.payload));

                return ++counter < tot;
            }
        }
    }
}

module.exports = CompletionItem;