/**
*   Modelo Likes 
**/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Modelo Like
const LikeSchema = Schema({
    //id publicacion a la que se le dara el like
    idPublication: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Publications"
    },
    //usuario que dio el like
    idUser: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Users"
    }
});

//Exportando modelo 
module.exports = mongoose.model('Likes', LikeSchema);
