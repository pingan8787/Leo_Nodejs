const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

router
    .get('/',function(ctx, next){
        ctx.body = 'hi leo';
    })
    .get('/todo',function(ctx,next){
        ctx.body = 'hi todo';
    })

app
    .use(router.routes())
    .use(router.allowedMethods());
app.listen(3000,()=>{
    console.log('ok')
})