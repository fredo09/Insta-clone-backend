/**
*   Resolvers en Graphql 
**/
const { register, login, getUser, updateAvatar, deleteAvatar, updateUser, searchUser } = require('./../../controllers/users');
const { follow, isFollow, unFollow, getFollowers, getFolloweds } = require('./../../controllers/follows');
const { publish, publications } = require('./../../controllers/publication');
const { addComent, getPublications } = require('./../../controllers/Comment');

const resolvers = {
    Query: {
        // User
        getUser: (_, { id, username }) => getUser(id, username),
        search: (_, { search }) => searchUser(search),

        // Follow
        isFollow: (_, { username }, ctx) => isFollow(username, ctx),
        getFollowers: (_, { username }) => getFollowers(username),
        getFolloweds: (_, { username }) => getFolloweds(username), 

        //Publication
        getPublications: (_, { username }) => publications(username),

        //Comments
        getComments: (_, { idPublication }) => getPublications(idPublication),
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

        //Comment
        addComment: (_, { input }, ctx ) => addComent(input, ctx),
    }
}

module.exports = resolvers;
