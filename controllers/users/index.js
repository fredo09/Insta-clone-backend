/**
*   Controllers Users 
**/

const User = require('./../../models/users');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { awsUploadImages } = require('./../../utils/aws-upload-images');

//Registrar Usuario
const register = async (input) => {
        //Pasando el email a minusculas para guardar
        const newUser = input;
        newUser.email = newUser.email.toLowerCase();
        newUser.username = newUser.username.toLowerCase();

        const { username, email, password } = newUser;
            
        //Revisamos que el email no este dado de alta
        const foundEmail = await User.findOne({ email });
        if (foundEmail) throw new Error('Email ya registrado');

        //Revisamos que el username no este dado de alta
        const foundUserName = await User.findOne({ username });
        if (foundUserName) throw new Error('Username ya registrado');

        //Encriptar
        const salt = await bcryptjs.genSaltSync(10);
        newUser.password = await bcryptjs.hash(password, salt);

        try {
            // Guardar nuevo usuario
            const user = new User(newUser);
            user.save();
            return user;

        } catch (error) {
            console.log(error);
        }
}

//Obtener Usuario
const getUser = async (id, username) => {
    let user = null;

    if (id) user = await User.findById(id);
    if (username) user = await User.findOne({ username });

    if (!user) throw new Error('El usuario no existe');

    return user;
}

//Subiendo Files
async function updateAvatar(file) {
  const { createReadStream, mimetype } = await file;
  const extension = mimetype.split("/")[1];
  const imageName = `avatar/avt.${extension}`;
  const fileData = createReadStream();

  try {
    const result = await awsUploadImages(fileData, imageName);
    console.log(result);
  } catch (error) {
    return {
      status: false,
      urlAvatar: null,
    };
  }
}

const login = async ({ email, password }) => {
    
    //Revisamos que el username no este dado de alta
    const foundUser = await User.findOne({ email: email.toLowerCase() });
    if (!foundUser) throw new Error('Email o contraseña incorrecta');
    
    //Revisamos que el passoword sea el correcto
    const passwordSuccess = await bcryptjs.compare(password, foundUser.password );
    if (!passwordSuccess) throw new Error('Email o contraseña incorrecta');

    // retornamos el token una vez ya creado
    return {
        token : createToken(foundUser, process.env.SEED,{ expiresIn: process.env.CADUCIDAD_TOKEN })
    }
}

// Crear token
const createToken = async (user, SECRET_KEY, expiresIn) => {
    const { id, name, username, email } = user;

    const payload = {
        id,
        name,
        username,
        email
    };

    return  jwt.sign(payload, SECRET_KEY, expiresIn);
}

module.exports = {
    register,
    login,
    getUser,
    updateAvatar
}