const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Post {
        _id: ID!
        title: String!
        content: String!
        imageUrl: String!
        creator: User!
        createdAt: String!
        updatedAt: String!
    }

    type User {
        _id: ID!
        name: String!
        email: String!
        password: String
        status: String!
        posts: [Post!]!
    }
     type authData{
        token: String!
        userId: String! 
     }
    input UserInputData {
        email: String!
        name: String!
        password: String!
    }
     type postData{
        posts:[Post!]!
        totalPosts:Int!
     }
    type RootQuery {
        login(email:String!,password:String!): AuthData
        posts(page:Int): PostData!
        post(id: ID!): Post!
        user: User!
    }

    input PostInputData{
        title: String!
        content:String!
        imageUrl:String!
    }
    type RootMutation {
        createPost(postInput: PostInputData): Post!
        createUser(userInput: UserInputData): User!
        updatePost(id:ID!,postInput:postInputData):Post!
        deletePost(id:ID!):Boolean
        updateStatus(status:String!): User!
        }
    
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
