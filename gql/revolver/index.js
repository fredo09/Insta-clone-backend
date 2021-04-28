/**
*   Resolvers en Graphql 
**/
const { register, login, getUser, updateAvatar, deleteAvatar, updateUser, searchUser } = require('./../../controllers/users');
const { follow, isFollow, unFollow, getFollowers, getFolloweds } = require('./../../controllers/follows');
const { publish, publications, FeedPublications } = require('./../../controllers/publication');
const { addComent, getPublications } = require('./../../controllers/Comment');
const { addLikes, deleteLikes, isLikes, countLikes } = require('./../../controllers/Like');

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
        getPublicationsFeed: (_, {}, ctx) => FeedPublications(ctx),

        //Comments
        getComments: (_, { idPublication }) => getPublications(idPublication),

        //likes
        isLike: (_, { idPublication }, ctx) => isLikes(idPublication, ctx),
        countLikes: (_, { idPublication }) => countLikes(idPublication), 
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
        addComment: (_, { input }, ctx) => addComent(input, ctx),
        
        //like
        addLike: (_, { idPublication }, ctx) => addLikes(idPublication, ctx),
        deleteLike: (_, { idPublication }, ctx) => deleteLikes(idPublication, ctx), 
    }
}

module.exports = resolvers;
