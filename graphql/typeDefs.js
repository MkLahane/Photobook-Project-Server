const { gql } = require('apollo-server-express');

module.exports = gql`
    type Photo {
        id: ID!
        photobookId: ID!
        img_id: String!
        text_data: String!
        created_at: String!
    },
    type Comment {
        id: ID!
        body: String!
        created_at: String!
        userId: ID!
        user: User!
        likesCount: Int!
        likes: [Like]!
        photobook: Photobook!
    }, 
    type Like {
        id: ID!
        user: User!
        photobook: Photobook!
        created_at: String!
    },
    type Photobook {
        id: ID!
        userId: ID!
        user: User!
        username: String!
        photos: [Photo!]!
        created_at: String!
        likesCount: Int!
        likes: [Like]!
        comments: [Comment]!
        commentsCount: Int!
        cover_image_id: String!
        cover_text: String!
    },
    type User {
        id: ID!
        username: String!
        email: String!
        password: String! 
        confirmed: Boolean!
        token: String!
        created_at: String!
        photobooks: [Photobook!]!
    },
    input RegisterInput {
        username: String!
        email: String! 
        password: String! 
        confirmPassword: String!
    },
    input PhotoInput {
        img_id: String!
        text_data: String!
    }
    type Query {
        getUsers: [User]!
        getPhotobooks: [Photobook]!
        getPhotobook(photobookId: ID!): Photobook!
    }
    type Mutation {
        login(email: String!, password: String!): User!
        register(registerInput: RegisterInput!): User!
        confirm(token: String!): String!
        createPhotobook(photobookInput: [PhotoInput], cover_image_id: String!, cover_text: String!): Photobook!
        deletePhotobook(photobookId: ID!): Photobook!
        createComment(photobookId: ID!, body: String!): Photobook!
        deleteComment(commentId: ID!, photobookId: ID!): Photobook!
        likePhotobook(photobookId: ID!): Photobook!
        likeComment(commentId: ID!, photobookId: ID!): Photobook!
    }
    type Subscription {
        newPhotobook: Photobook!
    }
`;