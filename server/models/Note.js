const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    title : {
        type: String
    },
    description : {
        type: String,
        unique: true
    },
    author : {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('notes', NotesSchema);