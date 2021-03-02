/**
*   Resolvers en Graphql 
**/
const { register, login, getUser, updateAvatar, deleteAvatar, updateUser, searchUser } = require('./../../controllers/users');
const { follow, isFollow, unFollow, getFollowers, getFolloweds } = require('./../../controllers/follows');
const { publish } = require('./../../controllers/publication');

const resolvers = {
    Query: {
        // User
        getUser: (_, { id, username }) => getUser(id, username),
        search: (_, { search }) => searchUser(search),

        // Follow
        isFollow: (_, { username }, ctx) => isFollow(username, ctx),
        getFollowers: (_, { username }) => getFollowers(username),
        getFolloweds: (_, { username }) => getFolloweds(username), 
    },
    Mutation: {
        // User
        register: (_, { input } ) => register(input),
        login: (_, { input } ) => login(input),
        uploadAvatar: (_, { file }, ctx ) => updateAvatar(file, ctx),
        deleteAvatar: (_, {}, ctx) => deleteAvatar(ctx),
        updateUser: (_, { input }, ctx) => updateUser(input, ctx),

        //  Follow
        follow: (_, { username }, ctx) => follow(username, ctx),
        unFollow: (_,{ username }, ctx) => unFollow(username, ctx),

        // Publication
        publish: (_, { file }, ctx) => publish(file, ctx),
    }
}

module.exports = resolvers;
