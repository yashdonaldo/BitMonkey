export const CourseSchema = `#graphql
    type Mutation {
        CreateCourse(tittle: String!, discription: String!, thumbnail: String!, category: String!, enroll: Boolean ): String
    }

    type Query {
        getAllCourse: [Course]
        GetSingleCourse(id: ID!): Course
    }

    type Course {
        _id: ID
        tittle: String
        discription: String
        thumbnail: String
        category: String
        enroll: Boolean
        user: User
    }

    type User {
        _id: ID
        name: String
        email: String
        role: String
    }

`