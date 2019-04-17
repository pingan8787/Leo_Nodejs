module.exports = app => {
  class UserController extends app.Controller {
    async register (){
      try {
        const body = this.ctx.request.body
        const hasUser = await this.ctx.service.user.getUser(body.account)
        if(hasUser && hasUser.length > 0){
          this.ctx.throw(400, '帐号已存在，请修改', {data:body})
          return 
        }else{
          const status = this.ctx.service.user.register(body)
          if(status){
            this.ctx.body = {
                code: 200,
                message: `帐号注册成功`,
                data: body
            }
          }else{
            this.ctx.throw(400, '帐号注册失败', {data:body})
          }
        }
      } catch (error) {
        console.log(error)
      }
    }

    async login (){
      try {
        const body = this.ctx.request.body
        const hasUser = await this.ctx.service.user.getUser(body.account)
        
      } catch (error) {
        
      }
    }
  }
  return UserController
}
