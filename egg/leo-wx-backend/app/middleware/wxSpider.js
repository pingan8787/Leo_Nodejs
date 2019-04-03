const superagent = require('superagent');
const cheerio = require('cheerio');

const wxUntil = require('../until/wxUntil');

const TYPE = {}

module.exports = {
    getWxDetail (url){
        // 需要爬取页面内容 nodejs爬虫在这处理
        superagent.get(url).end((err, res) => {
            if(err){
                console.log(err)
                return
            }
            const $ = cheerio.load(res.text);
            // #activity-name 正文标题
            // #js_content 正文HTML结构
            // #publish_time 发布时间
            // #profileBt .profile_nickname 公众号名称
            // #profileBt .profile_meta_value 微信号
            // #profileBt .profile_meta_value 公众号介绍
            // #meta_content .rich_media_meta_text 文章作者
            let result = {
                url: url,
                title: wxUntil.delSpace($('#activity-name').text()),
                author: wxUntil.delSpace($('#meta_content .rich_media_meta_text').text()),
                date: $('#publish_time.rich_media_meta.rich_media_meta_text').text(),
                // profileBt: $('#profileBt').text(),
                gzhName: wxUntil.delSpace($('#profileBt .profile_nickname').text())
            }
            console.log($('#publish_time.rich_media_meta.rich_media_meta_text').text())
            
            $('#profileBt .profile_meta_value').each((i, ele) => {
                let elem = $(ele).text();
                i == 0 && (result.gzhId = elem);
                i == 1 && (result.gzhIntroduce = elem);
            });
            // console.log(result)
            return result
        })
    }
}