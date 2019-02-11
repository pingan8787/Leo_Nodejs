这里主要区分：`module.filename`、`__filename`、`__dirname`、`process.cwd()`和`require.main.filename`

它们的区别如下：   
* `module.filename`：开发期间，该行代码所在的文件。   
* `__filename`：始终等于 `module.filename`。   
* `__dirname`：开发期间，该行代码所在的目录。   
* `process.cwd()`：运行node的工作目录，可以使用 ` cd /d` 修改工作目录。   
* `require.main.filename`：用`node命令`启动的`module`的`filename`, 如 `node xxx`，这里的`filename`就是这个`xxx`。   

案例如下：   
* 文件结构
![文件结构](http://images.pingan8787.com/2019021101.png)    

* app.js
```js
//执行 node E:\node_study\file_path_study\app.js
console.log('*** app start ***');
console.log('***      module.filename = ' + module.filename + ' ***');
console.log('***           __filename = ' + __filename + ' ***');
console.log('***            __dirname = ' + __dirname + ' ***');
console.log('***        process.cwd() = ' + process.cwd() + ' ***');
console.log('*** require.main.filename= ' + require.main.filename + ' ***');

console.log('*** app end ***');
console.log('');
require('./lib/test');
```

* test.js
```js
console.log('*** app start ***');
console.log('***      module.filename = ' + module.filename + ' ***');
console.log('***           __filename = ' + __filename + ' ***');
console.log('***            __dirname = ' + __dirname + ' ***');
console.log('***        process.cwd() = ' + process.cwd() + ' ***');
console.log('*** require.main.filename= ' + require.main.filename + ' ***');
console.log('*** app end ***');
```

* 输出结果
![输出结果](http://images.pingan8787.com/2019021102.png)    

**Nodejs官方文档介绍**：   
* `__dirname`    
当前模块的目录名。相当于 __filename 的 path.dirname()。

例子，在 /Users/mjr 目录下运行 node example.js：
```js
console.log(__dirname);
// 输出: /Users/mjr
console.log(path.dirname(__filename));
// 输出: /Users/mjr
```

* `__filename`   
当前模块的文件名（处理后的绝对路径）。
  
不一定与命令行中使用的名称一致。   

当前模块的目录名可以使用` __dirname `获取。   

例子：

在 `/Users/mjr` 目录下运行 `node example.js`：   
```js
console.log(__filename);
// 输出: /Users/mjr/example.js
console.log(__dirname);
// 输出: /Users/mjr
```
假设两个模块 `a` 和 `b`, 其中` b` 是 `a` 的依赖文件，且目录结构如下：
* `/Users/mjr/app/a.js`   
* `/Users/mjr/app/node_modules/b/b.js`   

则 `b.js` 中的 `__filename` 会返回 `/Users/mjr/app/node_modules/b/b.js`，`a.js `中的 `__filename` 会返回 `/Users/mjr/app/a.js`。

## 参考文章
1. [NodeJs：module.filename、__filename、__dirname、process.cwd()和require.main.filename 解惑](https://www.cnblogs.com/happyframework/archive/2013/05/16/3080910.html)   
2. [NodeJs 中文网](http://nodejs.cn/api/modules.html#modules_dirname)