/**
 * koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中。
 */
const koa = require('Koa');
const app = new koa();
const bodyparser = require('koa-bodyparser');

app.use(bodyparser());
app.use( async ctx =>{
    if(ctx.url === '/' && ctx.method === 'GET') {
        let html = `
            <div>test post</div>
            <form method="POST"  action="/">
                <p>userName</p>
                <input name="userName" /> <br/>
                <p>age</p>
                <input name="age" /> <br/>
                <p>webSite</p>
                <input name='webSite' /><br/>
                <button type="submit">submit</button>
            </form>
        `;
        ctx.body = html;
    }else if (ctx.url === '/' && ctx.method === 'POST') {
        let postData = ctx.request.body;
        ctx.body = postData;
    }else{
        ctx.body = '<h1>404</404>'
    }
})

app.listen(3000, ()=>{
    console.log('server in  3000')
})