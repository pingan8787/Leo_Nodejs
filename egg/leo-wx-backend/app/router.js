'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/wx', controller.wx.index);

  /**
   * 用户模块
   */
  router.post('/register',controller.user.register); // 注册用户

  /**
   * 微信文章模块
   */
  // router.post('/wx/add', controller.wx.add); // 添加文章
  router.post('/wx/add', controller.wx.add); // 添加文章
  router.post('/wx/preview', controller.wx.preview); // 预览文章
  router.get('/wx/getList', controller.wx.getList); // 获取文章列表
  router.get('/wx/list', controller.wx.list); // 获取文章列表 含 分页参数
};
