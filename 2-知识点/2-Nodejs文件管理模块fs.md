[阅读原文](https://juejin.im/post/5c676ba3e51d45798b51d65c#comment)   

## 一、fs 基础方法：

* `fs.stat` 检测是文件还是目录。   
* `fs.mkdir` 创建目录。   
* `fs.writeFile` 创建写入文件。   
* `fs.appendFile` 追加文件。   
* `fs.readFile` 读取文件（异步）。   
* `fs.readFileSync` 读取文件（同步）。   
* `fs.readdir` 读取目录。   
* `fs.rename` 重命名。   
* `fs.rmdir` 删除目录。   
* `fs.unlink` 删除文件。   

### 1、fs.stat：检测是文件还是目录
fs.js
```js
const fs = require("fs");
fs.stat('fs.js', (error, stats) => {
    if (error) {
        console.log(error);
        return false;
    } else {
        console.log(stats);
        console.log(`文件：${stats.isFile()}`); // 文件：true
        console.log(`目录：${stats.isDirectory()}`); // 目录：false

        return false;
    };
});
```
执行 node fs.js。
```js
console.log(stats)：
{ dev: 636204,
  mode: 33206,
  nlink: 1,
  uid: 0,
  gid: 0,
  rdev: 0,
  blksize: undefined,
  ino: 1407374883609714,
  size: 242,
  blocks: undefined,
  atime: 2018-12-25T09:14:40.866Z,
  mtime: 2019-01-15T09:18:06.561Z,
  ctime: 2019-01-15T09:18:06.561Z,
  birthtime: 2018-12-25T09:14:40.866Z }

console.log(`文件：${stats.isFile()}`); // 文件：true
console.log(`目录：${stats.isDirectory()}`); // 目录：false
```

### 补充：

* `stats.isFile()`  如果是文件返回 `true`，否则返回 `false`。   
* `stats.isDirectory()` 如果是目录返回 `true`，否则返回 `false`。  
* `stats.isBlockDevice()` 如果是块设备返回 `true`，否则返回 `false`。   
* `stats.isCharacterDevice()` 如果是字符设备返回 `true`，否则返回 `false`。   
* `stats.isSymbolicLink()`  如果是软链接返回 `true`，否则返回 `false`。   
* `stats.isFIFO()`  如果是`FIFO`，返回`true`，否则返回 `false`，`FIFO`是`UNIX`中的一种特殊类型的命令管道。   
* `stats.isSocket()`  如果是 Socket 返回 `true`，否则返回 `false`。   

### 2、fs.mkdir：创建目录
fs.js
```js
const fs = require("fs");
fs.mkdir('images', (err) => {
    if (err) {
        console.log(err);
        return false;
    } else {
        console.log("目录创建成功！");
    };
});
```
接收参数：

* `path`：将创建的目录路径。   
* `mode`：目录权限（读写权限），默认 0777。   
* `callback`：回调，传递异常参数 err。   

执行 `node fs.js`。  
会发现目录下多了一个 images 文件夹。   

### 3、fs.rmdir：删除目录
fs.js
```js
const fs = require("fs");
fs.rmdir('images', (err) => {
    if (err) {
        console.log(err);
        return false;
    } else {
        console.log("目录删除成功！");
    };
});
```
执行` node fs.js`。   
会发现目录下 images 文件夹被删除。   

### 4、fs.writeFile：创建写入文件
fs.js
```js
const fs = require("fs");
fs.writeFile("index.js", "hello NodeJS！", (err) => {
    if (err) {
        console.log(err);
        return false;
    } else {
        console.log("文件写入成功！");
    };
});
```
接收参数：

* ``filename` (String) 文件名称。   
* ``data` (String | Buffer) 将要写入的内容，可以是字符串或者 buffer 数据。   
* ``encoding` (String) 可选。默认 `'utf-8'`，当 data 是 buffer 时，该值应该为 ignored。   
* ``mode` (Number) 文件读写权限，默认 `438`。   
* ``flag` (String) 默认值 `'w'`。   
* ``callback` { Function } 回调，传递一个异常参数` err`。   

执行 `node fs.js`。   
会发现目录下多了一个 index.js 文件夹，并且添加了“hello NodeJS！”的内容。   

注意，这样的写入，是清空原文件中的所有数据，然后添加“hello NodeJS！”这句话，即：存在即覆盖，不存在即创建。   

### 5、fs.unlink：删除文件
fs.js
```js
const fs = require("fs");
fs.unlink("index.js", (err) => {
    if (err) {
        console.log(err);
        return false;
    } else {
        console.log("删除成功！");
    };
});
```
执行 `node fs.js`。   
会发现目录下 index.js 文件被删除。   

### 6、fs.appendFile：追加文件
fs.js
```js
const fs = require("fs");
fs.appendFile("index.js", "追加的内容", (err) => {
    if (err) {
        console.log(err);
        return false;
    } else {
        console.log("追加成功！");
    };
});
```
执行 `node fs.js`。   
会发现目录下 index.js 文件后有追加了一段话“追加的内容”。   

### 7、fs.readFile：读取文件
fs.js
```js
const fs = require("fs");
fs.readFile("index.js", (err, data) => {
    if (err) {
        console.log(err);
        return false;
    } else {
        console.log("读取文件成功！");
        console.log(data); // <Buffer 68 65 6c 6c 6f 20 4e 6f 64 65 4a 53 ef bc 81 e8 bf bd e5 8a a0 e7 9a 84 e5 86 85 e5 ae b9>
    };
});
```
执行 `node fs.js`。   
```js
console.log(data)
<Buffer 68 65 6c 6c 6f 20 4e 6f 64 65 4a 53 ef bc 81 e8 bf bd e5 8a a0 e7 9a 84 e5 86 85 e5 ae b9>
```

### 8、fs.readdir：读取目录
fs.js
```js
const fs = require("fs");
fs.readdir("node_modules", (err, data) => {
    if (err) {
        console.log(err);
        return false;
    } else {
        console.log("读取目录成功！");
        console.log(data); // [ '03_tool_multiply.js', 'my_module' ]
    };
});
```
执行 `node fs.js`。   
```js
console.log(data) 
[ '03_tool_multiply.js', 'my_module' ]
```

### 9、fs.rename：重命名
fs.js
```js
const fs = require("fs");
fs.rename("index.js", "new_index.js", (err) => {
    if (err) {
        console.log(err);
        return false;
    } else {
        console.log("重命名成功！");
    };
});
```
执行 `node fs.js`。   
会发现目录下 index.js 文件被修改为 new_index.js。   

### 10、补充：fs.rename 还可以剪切
fs.js
```js
const fs = require("fs");
fs.rename("new_index.js", "node_modules/new_index.js", (err) => {
    if (err) {
        console.log(err);
        return false;
    } else {
        console.log("剪切成功！");
    };
});
```
执行 `node fs.js`。   
会发现目录下 new_index.js 文件被移动到了 node_modules 目录下。   

## 二、fs 案例
### 1、判断是否有 upload 目录
fsDemo.js
```js
const fs = require("fs");
fs.stat("upload", (err, stats) => {
    if (err) {
        // 如果没有，创建 upload 目录
        fs.mkdir("upload", (err) => {
            if (err) {
                console.log(err);
                return false;
            } else {
                console.log("创建成功！");
            };
        })
    } else {
        console.log(stats.isDirectory()); // true
        console.log("有 upload 目录，你可以做更多操作！");
    };
});
```
执行 fsDemo.js。   
打印结果：   
```js
console.log(stats.isDirectory()); // true
```
有 upload 目录，你可以做更多操作！   

### 2、读取目录全部文件   
fsDemo.js
```js
const fs = require("fs");
fs.readdir("../05fs/", (err, files) => {
    if (err) {
        console.log(err);
        return false;
    } else {
        console.log(files);
        let filesArr = [];

        (function getFile(i) {
            // 循环结束
            if (i == files.length) {
                // 打印出所有目录
                console.log("目录");
                console.log(filesArr);
                return false;
            };

            // 判断目录是文件还是文件夹
            fs.stat("../05fs/" + files[i], (err, stats) => {
                if (stats.isDirectory()) {
                    filesArr.push(files[i]);
                };
                // 递归调用
                getFile(i + 1);
            });
        })(0);
    };
});
```
执行 fsDemo.js。   
打印结果：   
```
[ 'fs.js', 'fsDemo.js', 'fsStream.js', 'upload' ]
目录
[ 'upload' ]
```

## 三、fs 流
### 1、fs 流及其读取
首先创建一个 index.js 文件，并添加测试文本。   
fsStream.js   
```js
const fs = require("fs");
// 流的方式读取文件
const fileReadStream = fs.createReadStream("index.js");
// 读取次数
let count = 0;
// 保存数据
let str = "";
// 开始读取
fileReadStream.on("data", (chunk) => {
    console.log(`${++count} 接收到：${chunk.length}`);
    str += chunk;
});
// 读取完成
fileReadStream.on("end", () => {
    console.log("结束");
    console.log(count);
    console.log(str);
});
// 读取失败
fileReadStream.on("err", (err) => {
    console.log(err);
});
```

执行 fsStream.js。   
打印结果：   
```
1 接收到：18
结束
1
fs 流及其读取
```

### 2、流的写入
fsStream.js
```js
const fs = require("fs");
let data = "存入数据...";
// 创建一个可以写入的流，写入到 index.js
let fileWriteStream = fs.createWriteStream("index.js");
// 开始写入
fileWriteStream.write(data, "utf8");
// 写入完成
fileWriteStream.end();
fileWriteStream.on("finish", () => {
    console.log("写入完成！");
});
```

执行 fsStream.js。   
打开 index.js 文件，发现里面内容变成了“存入数据...”。   
打印结果：   
```
写入完成！   
```

以上我们就通过流的形式进行了读取和写入的操作。

