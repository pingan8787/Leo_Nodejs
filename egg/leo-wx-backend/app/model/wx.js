const Collection = require('../../config/db.config').Collection;

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const WxSchema = new Schema({
        url: String,
        title: String,
        author: String,
        date: String,
        gzhName: String,
        gzhId: String,
        gzhIntroduce: String,
        header: String
    });
    return mongoose.model('Wx', WxSchema, Collection.WX_DATA);
}