import { gql } from '@apollo/client'

// Register User by Graphql
export const RegisterUser = `#graphql
    mutation RegisterUser($name: String!, $email: String!, $password: String!) {
  registeruser(name: $name, email: $email, password: $password)
}`

// Login User by Graphql
export const Loginuser = `#graphql
    mutation LoginUser($email: String!, $password: String!) {
  LoginUser(email: $email, password: $password) {
    success
    user {
      _id
      name
      email
      role
    }
    token
  }
}
`

// Load User by Graphql
export const LoadUserQuery = gql`
    query{
        getUserDetail{
            _id
            name
            email
            role
        }
    }
`

// Get All User by Graphql
export const GetAllUser = gql`
    query{
        getAllUser{
            _id
            name
            email
            role
        }
    }
`

// Delete User by Graphql
export const DeleteUser = `#graphql
    mutation DeleteUser($id: ID!) {
  DeleteUser(id: $id)
}`

// UpdateUser by Graphql
export const UpdateUser = `#graphql
    mutation UpdateUser($id: ID!, $name: String, $email: String, $role: String) {
  UpdateUser(id: $id, name: $name, email: $email, role: $role){
    message
    user{
      _id
      name
      email
      role
    }
  }
}`