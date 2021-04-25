/**
*   Schema Coments 
**/

const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    // id de la publicacion que pertenece
    idPublication: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Publications"
    },
    //id del usuario que creo el comentario
    idUser: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Users"
    },
    //contenido del comentario 
    comment: {
        type: String,
        require: true,
        trim: true
    },
    //fecha que se creo el comentario
    createAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Comments', commentSchema);
