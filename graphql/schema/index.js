const { buildSchema } = require('graphql');

// cravings key is set for String, where we need to change it to accept 
// Cravings object
module.exports = buildSchema(`
    type User {
        _id: ID!
        name: String!
        zipcode: Int!
        cravings: [String!]
    }

    type Craving {
        _id: ID!
        name: String!
    }

    type Group {
        _id: ID!
        name: String
        members: [User!]
        cravings: [Craving!]
    }

    input UserInput {
        name: String!
        zipcode: Int!
        cravings: [String!]
    }

    input GroupInput {
        name: String
        owner: ID!
    }

    type RootQuery {
        singleUser(_id: ID!): User
        users: [User!]!
        singleGroup(_id: ID!): Group
        groups: [Group!]!
    }

    type RootMutation {
        createUser(userInput: UserInput): User
        createGroup(groupInput: GroupInput): Group
        joinGroup(joinGroupInput: UserInput): Group
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)