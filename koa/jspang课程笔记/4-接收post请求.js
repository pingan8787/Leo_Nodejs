/**
 * 获取Post请求的步骤：
 * 解析上下文ctx中的原生nodex.js对象req。
 * 将POST表单数据解析成query string-字符串.(例如:user=jspang&age=18)
 * 将字符串转换成JSON格式。
 */

/*
 * ctx.request和ctx.req的区别
 * ctx.request:是Koa2中context经过封装的请求对象，它用起来更直观和简单。
 * ctx.req:是context提供的node.js原生HTTP请求对象。这个虽然不那么直观，但是可以得到更多的内容，适合我们深度编程。
*/
const koa = require('Koa');
const app = new koa();
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
        let postData = await parsePostData(ctx);
        ctx.body = postData;
    }else{
        ctx.body = '<h1>404</404>'
    }
})

function parsePostData (ctx) {
    return new Promise ((resolve,reject) => {
        try {
            let postdata = '';
            ctx.req.addListener('data', data=>{
                postdata += data;
            })
            // koa�ṩ��������on
            // ctx.req.on('end',()=>{})
            ctx.req.addListener('end', ()=>{
                let parseData = parseQueryStr(postdata);
                resolve(parseData);
            })
        } catch (error) {
            reject(error);
        }
    } )
}

function parseQueryStr (str) {
    let queryData = {};
    let queryStrList = str.split('&');
    for (let [index,queryStr] of queryStrList.entries() ){
        let itemList = queryStr.split('=');
        queryData[itemList[0]] = decodeURIComponent(itemList[1]);
    }
    return queryData
}

app.listen(3000, ()=>{
    console.log('server in  3000')
})