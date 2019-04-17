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
        let size = await this.ctx.model.Wx.count()
        console.log(list)
      } catch (error) {
        console.log(error)
      }
    }

    /**
     * 查询一条记录
     * @param {number} option.pageSize 每页数量
     * @param {number} option.pageIndex 当前页数
     * @param {number} option.sort 数据排序 -1降序 1升序 
     */
    async find (option){
      try{
        const { pageSize = 10, pageIndex = 1, sort = -1 } = option
        let list  = await this.ctx.model.Wx.find().sort({_id: sort}).limit(pageSize * pageIndex)
        let total = await this.ctx.model.Wx.count()
        return {
          pageSize,
          pageIndex,
          sort,
          list, 
          total
        }
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
