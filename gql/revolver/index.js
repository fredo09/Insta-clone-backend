/**
*   Resolvers en Graphql 
**/
const { register, login } = require('./../../controllers/users');

const resolvers = {
    Query: {
        // User
        getUser: () => {
            console.log('Obteniendo el Usuario');
            return null;
        }
    },
    Mutation: {
        // User
        register: (_, { input }) => register(input),
        login: (_,{ input } ) => login(input),
    }
}

module.exports = resolvers;