export const UserSchema = `#graphql
    type Mutation {
        registeruser(name: String!, email:String!, password:String!): String
        LoginUser(email:String!, password:String!):AuthResponse
        updatePassword(oldPassword:String!, newPassword:String!): String
        ResetPasswordToken(email:String!): String
        ResetPassword(token:String!, password:String!): String
        DeleteUser(id:ID!): String,
        UpdateUser(id:ID!, name: String, email: String, role: String): UpateUserResponse
    }
    
    type Query {
        getUserDetail: User
        getAllUser: [User]
        LogOutUser: String
    }

    type AuthResponse {
        success: Boolean!
        user: User
        token: String
    }

    type UpateUserResponse {
        user: User
        message: String
    }


    type User {
        _id: ID!
        name: String!
        email: String!
        role: String!
    }
`;