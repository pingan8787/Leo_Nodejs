const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const path = require('path');
const bodyParser = require('body-parser'); 
const _ = require('underscore');
const Movie = require('./models/movie');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webapp');
const db = mongoose.connection;
db.on('error', console.error.bind(console, '数据库连接失败:'));
db.once('open', function (callback) {
    console.log("数据库成功连接");
});


app.set('views','./views/pages'); // 设置视图的根目录
app.set('view engine', 'jade'); // 设置默认模版引擎
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
app.locals.moment = require('moment');
app.listen(port);

console.log('服务器已启动:localhost:'+port)

// 路由编写
app.get('/',(req,res)=>{
    Movie.fetch((err,movies)=>{
        if(err){
            console.log(err);
        }
        res.render('index', {title:'leo 首页',movies:movies})
    })
})
app.get('/movie/:id',(req,res)=>{
    const id = req.params.id;
    Movie.findById(id,(err,movie)=>{
        res.render('detail', {title:movie.title+'详情页面',movie:movie})
    })
})
app.get('/admin/movie',(req,res)=>{
    res.render('admin', {title:'leo 后台录入页面',movie:{
        title:'',
        doctor:'',
        country:'',
        year:'',
        poster:'',
        flash:'',
        summary:'',
        language:''
    }})
})
// update admin movie
app.get('/admin/update/:id',(req,res)=>{
    const id = req.params.id;
    if(id){
        Movie.findById(id,(err,movie)=>{
            res.render('admin',{
                title:'leo 后台更新页',
                movie:movie
            })
        })
    }
})

// post admin movie
app.post('/admin/movie/new',function(req,res){
    // 判断是否是新添加
    const id = req.body.movie._id;
    const movieObj = req.body.movie;
    let _movie;
    if(id !== 'undefined'){
        Movie.findById(id,(err,movie)=>{
            if(err){
                console.log(err);
            }
            _movie = _.extend(movie,movieObj);
            _movie.save((err,movie)=>{
                if(err){
                    console.log(err);
                }
                res.redirect('/movie/'+_movie._id);
            })
        })
    }else{
        _movie = new Movie({
            doctor: movieObj.doctor,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            summary: movieObj.summary,
            flash: movieObj.flash,
        })

        _movie.save((err,movie)=>{
            if(err){
                console.log(err)
            }
            res.redirect('/movie/'+movie._id);
        })
    }
})

app.get('/admin/list',(req,res)=>{
    Movie.fetch((err,movies)=>{
        if(err){
            console.log(err);
        }
        res.render('list', {title:'leo 列表页面',movies:movies})
    })
}) 
// list delete movie
app.delete('/admin/list',function(req,res){
    const id = req.query.id;
    if(id){
        Movie.remove({_id:id}, function(err,movie){
            if(err){
                console.log(err);
            }else{
                res.json({success:1});
            }
        })
    }
})