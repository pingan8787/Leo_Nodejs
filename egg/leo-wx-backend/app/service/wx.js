module.exports = app => {
  class WxService extends app.Service {
    async add (query){
        const { ctx } = this;
        const res = await ctx.model.Wx.create({
            article: query
        })
    }

    async adds (){

    }
  }
  return WxService
}
