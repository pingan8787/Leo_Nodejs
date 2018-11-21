/**
* 在koa2中GET请求通过request接收，但是接受的方法有两种：query和querystring。
* query：返回的是格式化好的参数对象。
* querystring：返回的是请求字符串。
*/
const Koa = require('koa');
const app = new Koa();
app.use(async(ctx)=>{
    let url =ctx.url;
    //从request中获取GET请求
    let request =ctx.request;
    let req_query = request.query;
    let req_querystring = request.querystring;
    //从上下文中直接获取
    let ctx_query = ctx.query;
    let ctx_querystring = ctx.querystring;
    ctx.body={
        url,
        req_query,
        req_querystring,
        ctx_query,
        ctx_querystring
    }
});
app.listen(3000,()=>{
    console.log('[demo] server is starting at port 3000');
});
