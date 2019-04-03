const getWxDetail = require('../middleware/wxSpider').getWxDetail;

module.exports = app => {
  class WxController extends app.Controller {
    async index (){
        this.ctx.body = 'hello leo , this is wx page';
    }

    async add (){
        try {
            const body = this.ctx.request.body;
            this.ctx.service.wx.add(body);
            this.ctx.body = {
                code: 200,
                message: `成功添加文章《${body.title}》`
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getList (){
        try {
            // this.ctx.service.wx.getList();
            let list = await this.ctx.model.Wx.find()
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

    async getDetail (url){
        const body = this.ctx.request.body;
        getWxDetail(body.url);
        this.ctx.body = {
            code: 200,
            message: `文章URL为${body.url}`
        }
    }
  }
  return WxController
}
