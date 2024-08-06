const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const order = new Schema({
    id: { type: ObjectId }, //khóa chính
    date: { type: String },
    idUser: { type: ObjectId, ref: 'user' }, //khóa ngoại
    total: { type: Number },
});
module.exports = mongoose.models.order || mongoose.model('order', order);
