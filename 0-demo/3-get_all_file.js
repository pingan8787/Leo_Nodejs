/**
 * @author leo
 * @date 2019.02.12
 * 温馨提示：
 * 代码千万行，
 * 注释第一行。
 * 命名不规范，
 * 同事两行泪。
 */

/**
 * 用途：
 * 检索项目中包含指定标签或类名的文件，并返回文件路径列表。
 * 检索方式：查找指定的标签或者类名两种方式。
 */

var fs = require('fs');
var path = require('path');

var filterFile = ['.html'];  // 需要检索的文件类型
var labelArray = [''];       // 需要检索的标签数组 （暂不支持）
var classArray = ['leo_class','leo_name'];  // 需要检索的类名数组
var filePath = path.join(__dirname, '..', 'develop');
var allFileNumber = 0;       // 总文件数
var resultArray = [];        // 最终结果
var resultAlassify = {};     // 最终结果分类


/**
 * 获取当前项目的所有HTML文件
 * @param {*} paths 文件的路径
 */
var getCurrenAllFile = function (paths){
	var fileArr  = [];
	// 初始化最终结果分类的对象
	for(var k in classArray){
		resultAlassify[classArray[k]] = []; 
	};
	fs.readdir(paths, function(err, files){
		files.forEach(function(item, index){
			var c_path = path.join(paths, item);
			var stat = fs.lstatSync(c_path);
			if(stat && stat.isDirectory()){
				getCurrenAllFile(c_path);
			}else{
				if(filterFile.indexOf(path.extname(item)) >= 0 ){
					getCurrentFile(c_path, item);
	            	// fileArr.push(path.resolve(__dirname, item))
				}
			}
		});
	});
	return fileArr;
}

/**
 * 获取当前文件内容
 * @param {*} paths    文件的路径
 * @param {*} filename 文件名
 */
var getCurrentFile = function(paths, filename){
	fs.readFile(paths, 'utf8', function(err, data){
		allFileNumber ++;
		console.log('正在检索第'+ allFileNumber +'个文件，文件名：【'+ filename +'】');
		if (err) console.log(err);
		searchCurrentFile(data, paths);
	});
};

/**
 * 检索当前文件内容
 * @param {*} data  文件的内容
 * @param {*} paths 文件的路径
 */
var searchCurrentFile = function(data, paths){
	var isInclude;
	for(var k in classArray){
		// 清楚单引号和双引号的影响
		data.replace(/'/g,'');
		data.replace(/"/g,'');
		isInclude = data.indexOf(classArray[k]);
		if(data.indexOf(classArray[k]) >= 0){
			console.log('--------------检索到结果，路径为：'+paths)
			resultArray.push(paths);
			resultAlassify[classArray[k]].push(paths);
		}
	}
};


var init = function (){
	getCurrenAllFile(filePath);
	setTimeout(function(){
		// 最后输出
		console.log('-------检索结果-------')
		console.log('共检索到：'+resultArray.length+'个结果！');
		console.log(resultArray);
		console.log('---------------------')
		for(var k in classArray){
			console.log('-------' + classArray[k] + '检索结果（共' + resultAlassify[classArray[k]].length+ '个）-------')
			console.log(resultAlassify[classArray[k]]);
			console.log('---------------------')
		}
	}, 1000);
};

init();