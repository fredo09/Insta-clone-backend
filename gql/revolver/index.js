/**
*   Resolvers en Graphql 
**/
const { register, login, getUser, updateAvatar } = require('./../../controllers/users');

const resolvers = {
    Query: {
        // User
        getUser: (_, { id, username }) => getUser(id, username),
    },
    Mutation: {
        // User
        register: (_, { input } ) => register(input),
        login: (_, { input } ) => login(input),
        uploadAvatar: (_, { file } ) => updateAvatar(file)
    }
}

module.exports = resolvers;
