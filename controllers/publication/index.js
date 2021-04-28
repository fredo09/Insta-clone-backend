/**
*   Controllers Publications 
**/
const Publication = require('./../../models/publication');
const User = require('./../../models/users');
const Follow = require('./../../models/follow');
const { awsUploadImages } = require('./../../utils/aws-upload-images');
const { v4: uuidv4 } = require('uuid');

const publish = async (file, { user }) => {
    
    const { id } = user;

    const { createReadStream, mimetype  } = await file;
    const extencion = mimetype.split("/")[1];
    const fileName = `publication/${id}_user/${uuidv4()}.${extencion}`;
    const fileData = createReadStream();

    try {
        const result = await awsUploadImages(fileData, fileName);
        
        let publication = new Publication({
            idUser: id,
            file: result,
            typeFile: mimetype.split("/")[0],
            createAt: Date.now()
        });

        publication.save();

        return {
            status: true,
            urlFile: result
        }

    } catch ( error ) {
        console.error(error);
         return {
            status: false,
            urlFile: null
        }
    }
}

const publications = async (username) => {
    
    const user = await User.findOne({ username });
    if (!user) throw new Error ('Usuario no existe.');
    const publications = await Publication.find().where({ idUser: user._id }).sort({ createAt: -1 });

    if (!publications) throw new Error('No contiene Publicaciones');
    return publications;
}

//Obtener el Feed de publicaciones
const FeedPublications = async ({ user }) => {

    //Obtenemos todos lo usuarios que seguimos
    const followeds = await Follow.find({ idUser: user.id }).populate("idUserFollow");
    
    //Array de usuarios que seguimos
    const followedsList = [];

    for await (const data of followeds) {
        followedsList.push(data.idUserFollow);
    }

    //Sacamos las publicaciones de los usuario que seguimos
    const publicationsList = [];

    for await (const data of followedsList) {
        const publications = await Publication.find().where({
            idUser: data._id
        }).sort({
            createAt: -1
        }).populate("idUser");
        publicationsList.push(...publications);
    }

    //Sacando todas las publicaciones del usuario 
    const userPublications = await Publication.find().where({
        idUser: user.id
    }).sort({
        createAt: -1
    }).populate("idUser");

    const publicationsFeed = publicationsList.concat(userPublications);

    //resultado final ordenamiento por fechas entre las publicaciones
    const result = publicationsFeed.sort((a, b) => {
        return new Date(b.createAt) - new Date(a.createAt);
    });

    return result;
}

module.exports = {
    publish,
    publications,
    FeedPublications
}