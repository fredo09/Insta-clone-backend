/**
*   Controllers Follows 
**/
const Follow = require('./../../models/follow');
const User = require('./../../models/users');

// Seguir Usuarios
const follow = async (username, {user}) => {
    const userFound = await User.findOne({ username });

    if (!userFound) throw new Error ('Usuario no encontrado');
    
    try {
        //Realizamos el follow
        const follow = new Follow({
            idUser: user.id,
            idUserFollow: userFound._id
        });

        // Guardamos la información
        follow.save();

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// Comprobar el seguimiento de usuarios
const isFollow = async (username, { user }) => {
    
    const userFound = await User.findOne({ username });

    if (!userFound) throw new Error ('Usuario no encontrado');

    // Buscamos el follow
    const follow = await Follow.find({idUser: user.id})
        .where("idUserFollow")
        .equals(userFound._id);
    
    if (follow.length > 0) {
        return true;
    }

    return false;
}

//Dejar de seguir usuarios
const unFollow = async (username, {user}) => {
    const userFound = await User.findOne({username});

    if (!userFound) throw new Error('Usuario no Encontrado');
    
    const follow =await Follow.deleteOne({idUser: user.id})
        .where("idUserFollow")
        .equals(userFound._id);

        if (!follow.deletedCount > 0) {
            return true;
        }

    return false;
}

//Obtener los seguidores de un usuario
const getFollowers = async (username) => {
    const followersList = [];
    const user = await User.findOne({ username });
    
    if (!user) throw new Error('Usuario no encontrado');
    
    const followers = await Follow.find({ idUserFollow: user._id }).populate("idUser");
    
    //Componemos la información para mostrar los usuarios que nos siguen
    for await (const data of followers ){
        followersList.push(data.idUser);
    }

    return followersList;
}

//Obtener los usuarios seguidos de un usuario
const getFolloweds = async (username) => {
    const followedsList = [];
    const user = await User.findOne({ username });

    if (!user) throw new Error('Usuario no encontrado');

    const followeds = Follow.find({ idUser: user._id }).populate('idUserFollow');
    
    for await (const data of followeds) {
        followedsList.push(data.idUserFollow);
    }
    return followedsList;
}

module.exports = {
    follow,
    isFollow,
    unFollow,
    getFollowers,
    getFolloweds
}