const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// 後台的 詳細訊息Profile
// 創建時間 收支類型 收支描述 收入 支出 帳戶現金 備註 操作
// Create Schema
const ProfileSchema = new Schema({
    type: {
        type: String,
    },
    describe: {
        type: String,
    },
    income: {
        type: String,
        required: true
    },
    expend: {
        type: String,
        required: true
    },
    cash: {
        type: String,
        required: true
    },
    remark: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema);