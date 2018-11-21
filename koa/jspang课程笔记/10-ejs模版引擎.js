/**
 * koa2中使用模板机制必须依靠中间件，我们这里选择koa-views中间件
 * cnpm install --save koa-views
 * 安装ejs模板引擎
 * npm install --save ejs
 */
const Koa = require('koa');
const views = require('koa-views');
const path = require('path');
const app = new Koa();

app.use(views(path.join(__dirname, './view'),{
    extension : 'ejs'
}));


app.use(async ctx => {
    let title = 'hello leo';

    await ctx.render('index',{title})
})
app.listen(3000, () => {
    console.log(`server is starting at port 3000`);
})