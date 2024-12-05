import {ApolloServer} from '@apollo/server'
import { UserSchema } from './GraphqlSchema/UsersSchema.js';
import { DeleteUser, getAllUsers, LoginUserGraphql, LogOutUser, RegisterUser, ResetPassword, ResetPasswordToken, updatePassword, UpdateUser, UserDetails } from './GraphqlControllers/Users.js';

// Resolver
const Resolver = {
    Query: {
        getUserDetail: UserDetails,
        getAllUser: getAllUsers,
        LogOutUser: LogOutUser,
    },
    Mutation: {
        registeruser: RegisterUser,
        LoginUser: LoginUserGraphql,
        updatePassword: updatePassword,
        ResetPasswordToken: ResetPasswordToken,
        ResetPassword: ResetPassword,
        DeleteUser: DeleteUser,
        UpdateUser: UpdateUser,
    }
    
};

export const Graphqlserver = new ApolloServer({
    typeDefs: UserSchema,
    resolvers: Resolver,
});