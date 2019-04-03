module.exports = app => {
  class WxService extends app.Service {
    async add (body){
      try{
        await this.ctx.model.Wx.create({ article: body })
      }catch(err){
        console.log(err)
      }
    }


    async getList (){
      try {
        // let list = await this.ctx.model.Wx.find()
        // console.log(list)
      } catch (error) {
        console.log(error)
      }
    }
  }
  return WxService
}
