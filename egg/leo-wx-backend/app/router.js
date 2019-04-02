'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/wx', controller.wx.index);
  router.get('/wx/add', controller.wx.add);
};
