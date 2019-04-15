const Collection = require('../../config/db.config').Collection

module.exports = app => {
    const mongoose = app.mongoose
    const date = new Date()
    const UserSchema = mongoose.Schema({
        account: {type: String},
        password: {type: String},
        isAdmin: {type: Boolean},
        createTime: {
            type: Number,
            default: date.getTime()
        },
        createLocalTime: {
            type: String,
            default: date.toLocaleString()
        }
    })
    return mongoose.model('User', UserSchema, Collection.USER_DATA)
}