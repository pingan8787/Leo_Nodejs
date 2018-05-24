const mongoose = require('mongoose');
const MovieSchema = new mongoose.Schema({
    doctor: String,
    title: String,
    language:String,
    country: String,
    summary:String,
    flash:String,
    poster:String,
    year:String,
    meta:{
        createAt:{
            type: Date,
            default:Date.now()
        },
        updateAt:{
            type: Date,
            default:Date.now()
        }
    }
});
// 每次存储的时候都会调用一次
MovieSchema.pre('save',function(next){
// 判断是否是新增加
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }

    next();
});

// 添加静态方法
MovieSchema.statics = {
    fetch:function(cb){
        return this.find({}).sort('meta.updateAt').exec(cb);
    },
    findById:function(id, cb){
        return this.findOne({_id:id}).exec(cb);
    }
}

module.exports = MovieSchema