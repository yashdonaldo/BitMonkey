import { gql, useMutation, useQuery } from "@apollo/client"
import { AllUserACtion, LoginUserAction, RegisterUserAction } from "../../Reducer/UserReducer"
import { DeleteUser, GetAllUser, LoadUserQuery, Loginuser, RegisterUser, UpdateUser } from "../Query/query"
import { useEffect } from "react"

const LOGIN_USER_MUTATION = gql(Loginuser)
const REGISTER_USER_MUTATION = gql(RegisterUser)
const DELETE_USER_MUTATION = gql(DeleteUser)
const UPDATE_USER_MUTATION = gql(UpdateUser)

// Register User
export const useRegisterUser = () => {
    const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER_MUTATION)

    const RegisterUser = async (name, email, password) => {
        try {
            const response = await registerUser({ variables: { name, email, password } })
        } catch (error) {
            return error.message
        }
    }
    return { RegisterUser, data, loading, error };
}

// Login User
export const useLoginUser = () => {
    const [addUser, { data, loading, error }] = useMutation(LOGIN_USER_MUTATION)

    const LoginUser = async (email, password, dispatch) => {
        try {
            console.log(email, password)
            const response = await addUser({ variables: { email, password } })
            console.log(response)
            dispatch(LoginUserAction.User_Success(response.data.LoginUser.user))
        } catch (error) {
            dispatch(LoginUserAction.User_Fail(error.message))
        }
    }
    return { LoginUser, data, loading, error };
}

// Load User
export const useLoadUser = () => {
    const { data, loading, error } = useQuery(LoadUserQuery)
    const LoadUser = (dispatch) => {
        if (error) {
            dispatch(LoginUserAction.Load_User_Fail(error.message));
            return { status: 'error', message: error.message };
        }

        if (data && data.getUserDetail) {
            dispatch(LoginUserAction.Load_User_Success(data.getUserDetail));
            return { status: "success", message: data }
        }
        return { status: "unknown" }
    }
    return { LoadUser, data, loading, error };
}

// All Users {Admin}
export const useAllUsers = (dispatch) => {
    const { data, loading, error, refetch } = useQuery(GetAllUser, {
        fetchPolicy: "network-only",
    });
    const AllUsers = () => {
        try {
            if (data) {
                dispatch(AllUserACtion.All_Users_Success(data.getAllUser));
            }
        } catch (error) {
            dispatch(AllUserACtion.All_Users_Fail(error.message));
        }
    }

    useEffect(() => {
        AllUsers()
    }, [data, dispatch])
    return { AllUsers, data, loading, error, refetch };
}

// Delete User
export const useDeleteUser = () => {
    const [deleteUser, { data, loading, error, reset }] = useMutation(DELETE_USER_MUTATION);

    const Delete = async (id) => {
        try {
            await deleteUser({ variables: { id } })
        } catch (error) {
            return error.message
        }
    }
    return { Delete, data, loading, error, reset };
}

// Update User
export const useUpdateUser = () => {
    const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER_MUTATION);

    const Update = async (id, name, email, role) => {
        try {
            await updateUser({ variables: { id, name, email, role } })
        } catch (error) {
            return error.message
        }
    }
    return { Update, data, loading, error };
}

