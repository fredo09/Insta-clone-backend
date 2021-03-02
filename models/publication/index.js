/**
*   Model Publication 
**/

const mongoose = require('mongoose');
const { Schema } = mongoose;

const publicationSchema = new Schema({
    idUser: {
        type: Schema.Types.ObjectId,
        require:true,
        ref: 'Users'
    },
    file: {
        type: String,
        trim: true,
        require: true
    },
    typeFile:{
        type: String,
        trim: true
    },
    createAt:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Publications', publicationSchema);
