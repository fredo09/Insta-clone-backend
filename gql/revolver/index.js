/**
*   Resolvers en Graphql 
**/
const { register, login, getUser } = require('./../../controllers/users');

const resolvers = {
    Query: {
        // User
        getUser: (_, { id, username }) => getUser(id, username),
    },
    Mutation: {
        // User
        register: (_, { input }) => register(input),
        login: (_,{ input } ) => login(input),
    }
}

module.exports = resolvers;