module.exports = app => {
  class UserController extends app.Controller {
    async register (){
        // this.ctx.body = '注册成功';
        console.log('注册成功')
        const body = this.ctx.request.body
        this.ctx.service.user.register(body)
        this.ctx.body = {
            code: 200,
            message: `帐号注册成功`,
            data: body
        }
    }

    async login (){

    }
  }
  return UserController
}
