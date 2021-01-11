/**
*   Schema Follow 
**/

const mongoose = require('mongoose');
const { Schema } = mongoose;

const FollowSchema = new Schema({
    // IdUser del seguidor
    idUser : {
        type: Schema.Types.ObjectId,
        require: true,
        ref:  "Users"
    },
    // idUser del usuario al que seguimos
    idUserFollow : {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Users"
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Follows', FollowSchema);