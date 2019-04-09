const getWxDetail = require('../until/wxSpider').getWxDetail;

module.exports = app => {
  class WxController extends app.Controller {
    async index (){
        this.ctx.body = 'hello leo , this is wx page';
    }

    /**
     * 爬取文章信息
     */
    async add (){
        try {
            const body = this.ctx.request.body;
            const result = await getWxDetail(body.url);
            this.ctx.service.wx.add(result);
            console.log(result)
            this.ctx.body = {
                code: 200,
                message: `成功添加文章《${result.title}》`,
                data: result
            }
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * 预览一篇文章
     */
    async preview (){
        try {
            const body = this.ctx.request.body;
            const result = await getWxDetail(body.url);
            this.ctx.body = {
                code: 200,
                message: `成功预览文章《${result.title}》`,
                data: result
            }
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * 读取文章列表
     */
    async getList (){
        try {
            // this.ctx.service.wx.getList();
            // let list = await this.ctx.model.Wx.find().sort({_id: -1}).limit(3)
            let list  = await this.ctx.service.wx.find()
            this.ctx.body = {
                code: 200,
                message: `成功读取文章列表`,
                data: {
                    list: list,
                    size: list.length
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

  }
  return WxController
}
