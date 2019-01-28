const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
// const router = new Router({
//     prefix:'/test'
// });
// 定义根路由

// 定义两个子路由
let home = new Router();
home.get('/test1', async (ctx) =>{
    ctx.body = "home  test1!"
}).get('/todo', async (ctx) => {
    ctx.body = "home todo!"
})

let leo = new Router();
leo.get('/test1', async (ctx) =>{
    ctx.body = "leo  test1!"
}).get('/todo', async (ctx) => {
    ctx.body = "leo todo!"
})


// 定义父级路由
let router = new Router();
router.use('/home',home.routes(), home.allowedMethods());
router.use('/leo',leo.routes(), leo.allowedMethods());

app
    .use(router.routes())
    .use(router.allowedMethods());
app.listen(3000,()=>{
    console.log('ok')
})