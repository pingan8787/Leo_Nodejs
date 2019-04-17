module.exports = app => {
  class UserService extends app.Service {
    async getUser (account){
      try {
        let hasUser = await this.ctx.model.User.find({account})
        return hasUser
      } catch (error) {
        console.log(error)
      }
    }
    async register (data){
        try {
            let status = await this.ctx.model.User.create(data)
            // 判断注册是否成功
            return status
        } catch (error) {
            console.log(error)
        }
    }
  }
  return UserService
}
