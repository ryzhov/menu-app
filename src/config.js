/* global process */
/* global __webpack_hash__ */

export default {
    appVersion: process.env.APP_VERSION,
    // eslint-disable-next-line @typescript-eslint/camelcase
    buildHash: __webpack_hash__,
    debug: process.env.NODE_ENV !== 'production',
};
