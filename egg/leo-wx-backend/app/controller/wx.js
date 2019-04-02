module.exports = app => {
  class WxController extends app.Controller {
    async index (){
        this.ctx.body = 'hello leo , this is wx page';
    }

    async add (){
        try {
            const { ctx } = this;
            const query = ctx.query;
            this.ctx.service.wx.add(query);
            ctx.body = {
                code: 200
            }
        } catch (error) {
            console.log(error)
        }
    }
  }
  return WxController
}
