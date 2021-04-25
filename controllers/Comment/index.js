/**
*   Controllers Comments  
**/

const Comment = require('../../models/coments');

const addComent = ({ idPublication, comment }, { user }) => {
    console.log("Ejcutamos el servicio para agregar comentarios")
    console.log(comment);
    try {
        const commentNew = new Comment({
            idPublication,
            idUser: user.id,
            comment
        });
        commentNew.save();
        return commentNew;
    } catch (error) {
        console.log('Ocurrio un error ', error);
    }
}

const getPublications = async (idPublication) => {
    const result = await Comment.find({ idPublication }).populate("idUser");
    return result;
}

module.exports = {
    addComent,
    getPublications
}
