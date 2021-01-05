/**
*   Resolvers en Graphql 
**/
const { register, login, getUser, updateAvatar, deleteAvatar, updateUser } = require('./../../controllers/users');

const resolvers = {
    Query: {
        // User
        getUser: (_, { id, username }) => getUser(id, username),
    },
    Mutation: {
        // User
        register: (_, { input } ) => register(input),
        login: (_, { input } ) => login(input),
        uploadAvatar: (_, { file }, ctx ) => updateAvatar(file, ctx),
        deleteAvatar: (_, {}, ctx) => deleteAvatar(ctx),
        updateUser: (_, { input }, ctx) => updateUser(input, ctx)
    }
}

module.exports = resolvers;
