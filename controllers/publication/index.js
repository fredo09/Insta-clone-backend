/**
*   Controllers Publications 
**/
const Publication = require('./../../models/publication');
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

module.exports = {
    publish
}