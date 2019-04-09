'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/wx', controller.wx.index);

  // router.post('/wx/add', controller.wx.add); // 添加文章
  router.post('/wx/add', controller.wx.add); // 添加文章
  router.post('/wx/preview', controller.wx.preview); // 预览文章
  router.get('/wx/getList', controller.wx.getList); // 获取文章列表
};
