module.exports = app => {
  class UserService extends app.Service {
    async register (data){
        try {
            await this.ctx.model.User.create(data)
        } catch (error) {
            console.log(error)
        }
    }
  }
  return UserService
}
