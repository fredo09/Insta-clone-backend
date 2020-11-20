/**
*   Configuración aws para subir imagenes 
**/

require('dotenv').config({
    path: '.env'
});

const AWS = require('aws-sdk');

//Credenciales 
const ID = process.env.AWS_ID;
const SECRET = process.env.AWS_SECRET;
const BUCKET_NAME = process.env.AWS_NAME_BUCKET;

//Instancia del S3 para aws
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

//Funcion para subir imagenes
async function awsUploadImages(file, filePath) {
  const params = {
    Bucket: BUCKET_NAME,
    Key: `${filePath}`,
    Body: file,
  };

  try {
    const response = await s3.upload(params).promise();
    console.log(response);
    return response.Location;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

module.exports = {
    awsUploadImages
}
