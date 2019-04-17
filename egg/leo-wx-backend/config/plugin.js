'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  static: {
    enable: true,
    package: 'egg-mongoose'
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  passport: {
    enable: true,
    package: 'egg-passport',
  }
};
