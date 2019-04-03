const Collection = require('../../config/db.config').Collection;

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const WxSchema = new Schema({
        article: {
            title: String,
            url:  String, // 文件url地址
        }
    });
    return mongoose.model('Wx', WxSchema, Collection.WX_DATA);
}