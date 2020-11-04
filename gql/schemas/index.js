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
        siteWeb: String
        description: String
        password: String
        createAt: String
    }

    type Token {
        token : String
    }

    #Input crear usuario, datos a resivir de la petición
    input UserInput {
        name: String!
        username: String!
        email: String!
        password: String!
    }

    #Input para login de la aplicacion
    input LoginInput {
        email: String!
        password: String!
    }

    type Query {
        # User
        getUser: User
    }

    type Mutation {
        # User
        register( input: UserInput ) : User
        login( input: LoginInput ) : Token
    }
`;

module.exports = typeDefs;