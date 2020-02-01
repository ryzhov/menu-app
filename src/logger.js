/* global console */

import config from './config';

const noop = () => {};

export const debug = config.debug ? console.debug.bind(console) : noop;
export const log = config.debug ? console.log.bind(console) : noop;
export const info = console.info.bind(console);
export const error = console.error.bind(console);
export const dir = config.debug ? console.dir.bind(console) : noop;
