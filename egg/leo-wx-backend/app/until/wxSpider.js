const superagent = require('superagent');
const cheerio = require('cheerio');

const wxUntil = require('./wxUntil');

module.exports = {
    async getWxDetail (url){
        // 需要爬取页面内容 nodejs爬虫在这处理
        let res = await superagent.get(url)
        const $ = cheerio.load(res.text)
        let result = {
            url: url,
            title: wxUntil.leoTrim($('#activity-name').text()),  // 正文标题
            author: wxUntil.leoTrim($('#meta_content .rich_media_meta_text').text()), // 文章作者
            date: $('em#publish_time.rich_media_meta.rich_media_meta_text').text(),  // 发布时间
            // profileBt: $('#profileBt').text(),
            gzhName: wxUntil.leoTrim($('#profileBt .profile_nickname').text()), // 公众号名称
        }
        // #js_content 正文HTML结构
        $('#profileBt .profile_meta_value').each((i, ele) => {
            let elem = $(ele).text()
            i == 0 && (result.gzhId = elem); // 微信号ID
            i == 1 && (result.gzhIntroduce = elem) // 公众号介绍
        })

        // 正则 匹配封面图等
        let content = res.text
        let headImgReg = /( hd_head_img )= \"(http:)[\s\S]*(\"\|\|\"\"\;)/g
        let headImgArr = content.match(headImgReg)
        headImgArr = headImgArr[0].split('=')
        // let obj = {}
        // obj[headImgArr[0].replace(' ','')] = headImgArr[1].replace('"||"";','"').replace(/\"/g,'')
        result.header = headImgArr[1].replace('"||"";','"').replace(/\"/g,'')
        // console.log(obj)

        return result
    }
}

/**
 * round_head_img 公众号头像
 * hd_head_img  文章封面
 */