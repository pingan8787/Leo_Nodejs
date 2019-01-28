const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/daily';
// const MongoClient = require('mongodb').MongoClient;
// function _connectDB(callback) {
//     MongoClient.connect(url, (err, db) => {
//         callback(err, db);
//     })
// }
mongoose.connect(url);
let dailySchema = new mongoose.Schema({
    content:String,
    date:String
})
let DailyTable = mongoose.model('DailyTable',dailySchema); 
// 模式相当于一张表，里面的类型就是字段类型  表名自动转换成小写
// let oneList = DailyTable({content:'测试又一条',date:(new Date()).toLocaleString()}).save(function(err){
//     if(err) throw err;
//     console.log('保存成功')
// })

// let dailyData = [
//     {id:1,content:'今天感觉还不错，嗯 good。' , date:'2018/6/6 上午7:39:58'},
//     {id:2,content:'测试看看。' , date:'2018/6/6 上午7:39:58'},
//     {id:3,content:'在厦门的日子真不错。' , date:'2018/6/6 上午7:39:58'}
// ]

module.exports = function(app) {
    app.get('/', (req, res)=>{
        DailyTable.find({}).sort({'_id':-1}).exec(function(err,data){
            if(err) throw err;
            res.render('daily',{dailyData:data})
        })
    });
 
    app.post('/list', urlencodedParser, (req, res)=>{
        let oneList = DailyTable(
            {content:req.body.content,date:(new Date()).toLocaleString()}
        ).save(function(err,data){
            if(err) throw err;
            res.json(data); 
        })
    });

    // 删除换成传入 留言id  在每条留言加个id
    app.delete('/list/:id', (req, res)=>{
        DailyTable.find({_id:req.params.id}).remove(function(err, data){
            if(err) throw err;
            res.json(data);
        })
    });
}