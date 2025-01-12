import {ApolloServer} from '@apollo/server'
import { UserSchema } from './GraphqlSchema/UsersSchema.js';
import { DeleteUser, getAllUsers, LoginUserGraphql, LogOutUser, RegisterUser, ResetPassword, ResetPasswordToken, updatePassword, UpdateUser, UserDetails } from './GraphqlControllers/Users.js';
import { CourseSchema } from './GraphqlSchema/CourseSchema.js';
import { CreateCourse, GetAllCourses, GetSingleCourse } from './GraphqlControllers/CourseController.js';
import { ContentSchema } from './GraphqlSchema/ContentSchema.js';
import { CompleteContent, ContentCreate, DeleteContent, GetAllContent, GetContentByCourse, GetContentByCourseType, GetSingleContent, UpdateContent, } from './GraphqlControllers/ContentController.js';

// User Resolver
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

// Course Resolver
const CourseResolver = {
    Mutation: {
        CreateCourse
    },
    Query: {
        getAllCourse: GetAllCourses,
        GetSingleCourse
    },
}

// Content Resolver
const ContentResolver = {
    Mutation: {
        createContent: ContentCreate,
        GetSingleContent,
        UpdateContent,
        DeleteContent,
        CompleteContent,
        GetContentByCourse,
        GetContentByCourseType,
    },
    Query: {
        getAllContent: GetAllContent
    }
}

// Server
export const Graphqlserver = new ApolloServer({
    typeDefs: [
        UserSchema,
        CourseSchema,
        ContentSchema
    ],
    resolvers: [
        Resolver,
        CourseResolver,
        ContentResolver,
    ],
});
