const superagent = require('superagent');
const cheerio = require('cheerio');
const async = require('async');
const fs = require('fs');
const url = require('url');
const request = require('request');
const axios = require('axios');
const json2csv = require('json2csv').parse;

let house_index = 1; // 当前页数
let house_all = 100; // 总页数
let house_url = 'http://xm.lianjia.com/ershoufang/pg' + house_index + '/';

let house_arr = []; // 存放房屋信息
let house_file = "house_file_" + Date.now();

let timer = 1 * 60 * 1000; // 间隔刷新


// 设置数据格式
function set_item(elem) {
    return {
        title: elem.find('.title').text(),
        href: elem.find('.title a').attr('href'),
        house_code: elem.find('.title a').attr('data-housecode'),
        img: elem.find('.vr_item').attr('src'),
        total_price: elem.find('.totalPrice').text(),
        unit_price: elem.find('.unitPrice span').text(),
        house_add: elem.find('.houseInfo a').text(),
        house_info: elem.find('.houseInfo').text(),
        position_info: elem.find('.positionInfo').text(),
        position_add: elem.find('.houseInfo a').text(),
        follow_info: elem.find('.followInfo').text(),
        tag_subway: elem.find('.subway').text(),
        tag_vr: elem.find('.vr').text(),
        tag_taxfree: elem.find('.taxfree').text(),
        tag_haskey: elem.find('.haskey').text(),
    }
}

// 请求数据
function get_data() {
    superagent.get(house_url).end((err, res) => {
        if (err) {
            console.log('get error!');
        }
        console.log('正在读取第' + house_index + '页（总共' + house_all + '页）！');
        let $ = cheerio.load(res.text);
        $('.LOGCLICKDATA').each((i, ele) => {
            let elem = $(ele)
            let obj = set_item(elem);
            house_arr.push(obj);
        })
        if (house_all >= house_index) {
            get_data();
            house_index++;
        } else {
            save_data(house_arr);
        }
    })
}

// 保存数据
function save_data(data) {
    // var title = [
    //     '房源名称', '房源链接地址', '房源ID', '封面图地址', '总价', '单价', '房源地址', '房源信息',
    //     '位置信息', '详细位置', '关注情况', '标签_近地铁', '标签_VR看房', '标签_满五年', '标签_随时看房'
    // ];
    var title = [
        'title', 'href', 'house_code', 'img', 'total_price', 'unit_price', 'house_add', 'house_info',
        'position_info', 'position_add', 'follow_info', 'tag_subway', 'tag_vr', 'tag_taxfree', 'tag_haskey'
    ];
    var result = json2csv(data, title);
    fs.writeFile(house_file + '.csv', result, err => {
        if (err) console.log('save file failed!')
    });
}

function init() {
    setInterval(() => {
        get_data();
    }, timer)
}

init();