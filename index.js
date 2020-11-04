/**
*   Creando servidor index 
**/

const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');
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
        resolvers
    });

    serverApollo.listen().then(({ url }) => {
        console.log(`Servidor levantado en ${url}`);
    });
}