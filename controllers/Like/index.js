/**
*   Controller Likes 
**/

const Like = require('./../../models/likes');

//Agregamos Likes de una publicacion
const addLikes = ( idPublication , { user }) => {
    try {
        const like = new Like({
            idPublication,
            idUser: user.id
        });
        like.save();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

//Eliminamos Likes de una publicacion
const deleteLikes = async (idPublication, { user }) => {
    try {
        await Like.findOneAndDelete({ idPublication }).where({
            idUser: user.id
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

//Comprobamos si hay like en una publicacion
const isLikes = async (idPublication, { user }) => {
    try {
        const result = await Like.findOne({ idPublication }).where({
            idUser: user.id
        });
        if (!result) throw new Error("No hay likes de este usuario para esta publicacion");
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

//Contador de likes de una publicacion
const countLikes = async( idPublication ) => {
    try {
        const result = await Like.countDocuments({ idPublication });
        return result;
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    addLikes,
    deleteLikes,
    isLikes,
    countLikes
}
