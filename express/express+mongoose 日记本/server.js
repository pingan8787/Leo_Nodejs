const express = require('express');
const app = express();
const port = 3300;
const router = require('./router/router');

app.set('view engine', 'ejs');
app.use(express.static('./public'));

router(app);

const server = app.listen(port, ()=>{
    const host = server.address().address;
    console.log(`hello boy, the server listening at http://${host}:${port}`);
})