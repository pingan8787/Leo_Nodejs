module.exports = app => {
  class WxService extends app.Service {
    /**
     * 增加一条记录
     * @param {obj} res 
     */
    async add (res){
      try{
        await this.ctx.model.Wx.create(res)
      }catch(err){
        console.log(err)
      }
    }

    /**
     * 添加一条记录
     * @param {object} res 
     */
    async insert (res){

    }

    /**
     * 查询所有数据
     */
    async findAll (){
      try {
        // let list = await this.ctx.model.Wx.find()
        // console.log(list)
      } catch (error) {
        console.log(error)
      }
    }

    /**
     * 查询一条记录
     * @param {obj} option 查询语句
     * @param {obj} col 查询列
     * 
     * @param {number} option.pageSize 每页数量
     * @param {number} option.sorted 数据排序 -1降序 1升序 
     */
    async find ( option = {}, col = {}){
      try{
        const { pageSize = 10, sorted = -1 } = option
        return this.ctx.model.Wx.find().sort({_id: sorted}).limit(pageSize)
      }catch (error) {
        console.log(error)
      }
    }

    /**
     * 删除一条记录
     * @param {object} obj 查询语句
     */
    async remove (obj){

    }

    /**
     * 清空当前表
     */
    async drop (){

    }

    /**
     * 更新指定数据
     * @param {obj} option 查询语句
     * @param {obj} newData 新值
     */
    async update( option, newData){

    }
  }
  return WxService
}
