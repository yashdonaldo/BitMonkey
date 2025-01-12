export const ContentSchema = `#graphql
    type Mutation {
        createContent(tittle: String!, description: String!, image: String!, course_type: ID!): String
        GetSingleContent(id:ID!):Content
        UpdateContent(id:ID!, tittle: String, description: String, image: String, course_type: ID): String
        DeleteContent(id:ID!): String
        CompleteContent(id:ID!): String
        GetContentByCourse(id:ID!): [Content]
        GetContentByCourseType(categorys: String!): [Content]
    }
    type Query {
        getAllContent: [Content]

    }
    type Content {
        _id: ID
        tittle: String
        description: String
        image: String
        course: Course
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
`;