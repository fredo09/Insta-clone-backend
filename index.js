/**
*   Creando servidor index 
**/

const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');
const resolvers = require('./gql/revolver');
const typeDefs = require('./gql/schemas');
const dotenv = require('dotenv');

dotenv.config({ path: '.env' }) ;

mongoose.connect(`${process.env.DBB}`,{
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: true,
    useCreateIndex: true },(err, _) => {

    if (err) {
        console.log(err);
    } else {
        server();
    }
   
});

const server = () => {
    // lavantando servidor Apollo para Graphql
    const serverApollo = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {
            const token = req.headers.authorization;

            if (token) {
                try {
                    const user = jwt.verify(
                        token.replace('Bearer ', ''),
                        process.env.SEED  
                    );
                    
                    //retornamos el user despues de obtener el token
                    return {
                        user
                    }

                } catch (error) {

                    console.log('#### ERROR ####');
                    console.log(error);
                    throw new Error('#### Token no Valido ####');
                    
                }
            }

        }
    });

    serverApollo.listen().then(({ url }) => {
        console.log(`Servidor levantado en ${url}`);
    });
}