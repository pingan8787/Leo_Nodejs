const Koa = require('koa');
const app = new Koa();

app.use( async (ctx) =>{
    let url = ctx.url;
    let req = ctx.request;
    let req_query = ctx.req.query;
    let req_quertstring = req.querystring;
    ctx.body = {
        url,
        req_query,
        req_quertstring
    }

    console.log(ctx.body)
})

app.listen(3000)