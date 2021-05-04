/**
*   Schemas para Graphql 
**/

const { gql } = require('apollo-server');

// Creando los Schemas

const typeDefs = gql`
    type User{
        id: ID
        name: String
        username: String
        email: String
        avatar: String
        sitioWeb: String
        description: String
        password: String
        createAt: String
    }

    type Token {
        token : String
    }

    type uploadAvatar {
        status: Boolean
        urlAvatar: String
    }

    # Publish para publicar fotos
    type Publish {
        status: Boolean
        urlFile: String
    }

    #Publication para ver publicaciones por usuario
    type Publication {
        id: ID
        idUser: User
        file: String
        typeFile: String
        createAt: String
    }

    #Comentario de una publicación
    type Comment {
        idPublication: ID
        idUser: User
        comment: String
        createAt: String
    }

    #FeedPublicaciones
    type FeedPublication {
        id: ID
        idUser: User
        file: String
        typeFile: String
        createAt: String
    }

    #Input crear usuario, datos a resivir de la petición
    input UserInput {
        name: String!
        username: String!
        email: String!
        password: String!
    }

    # Actualiza informacion del usuario
    input UpdateUserInput{
        name: String
        email: String
        currentPassword: String
        newPassword: String
        sitioWeb: String
        description: String
    }

    #Input para login de la aplicacion
    input LoginInput {
        email: String!
        password: String!
    }

    #Input para agregar comentario a una publicacion
    input CommentInput {
        idPublication: ID
        comment: String
    }

    type Query {
        # User
        getUser(id: ID, username: String): User
        search(search: String): [User] # Buscar usuarios query gql

        # Follow
        isFollow(username: String!) : Boolean
        getFollowers(username: String!): [User]
        getFolloweds(username: String!): [User]
        getNotFollowed: [User]
        
        #Publication
        getPublications(username: String!):[Publication]
        getPublicationsFeed: [FeedPublication]
        getPublication(idPublication: ID!) : Publication

        #Comments
        getComments(idPublication: ID!) : [Comment]

        #Likes
        isLike(idPublication: ID!): Boolean
        countLikes(idPublication: ID!) : Int
    }

    type Mutation {
        # User
        register( input: UserInput ) : User
        login( input: LoginInput ) : Token
        uploadAvatar(file: Upload) : uploadAvatar
        deleteAvatar: Boolean
        updateUser( input: UpdateUserInput ): Boolean

        # Follow
        follow(username: String!): Boolean
        unFollow(username: String!) : Boolean

        # Publication
        publish(file : Upload): Publish

        #Comments
        addComment(input : CommentInput): Comment

        #Likes
        addLike(idPublication : ID! ): Boolean
        deleteLike(idPublication: ID! ) : Boolean
    }
`;

module.exports = typeDefs;