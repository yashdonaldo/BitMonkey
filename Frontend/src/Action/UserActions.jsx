import axios from "axios";
import { AllUserACtion, ForgotPasswordAction, LoginUserAction, RegisterUserAction, ResetPasswordAction, updatePasswordAction } from "../Reducer/UserReducer";
import { convertLength } from "@mui/material/styles/cssUtils";

// Register User 
export const RegisterUser = (userData) => async (dispatch) => {
    try {
        dispatch(RegisterUserAction.Register_User_Request())

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const data = await axios.post("/api2/v1/user/register", userData, config)
        console.log("Register Data", data)
        dispatch(RegisterUserAction.Register_User_Success(data.data))

    } catch (error) {
        console.log("register error", error)

        dispatch(RegisterUserAction.Register_User_Fail(error.response.data))
    }
}

// Login User
export const UserLogin = (userData) => async (dispatch) => {
    try {
        dispatch(LoginUserAction.User_Request())

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const data = await axios.post("/api2/v1/user/login", userData, config)
        console.log(data)
        dispatch(LoginUserAction.User_Success(data.data))
    } catch (error) {
        dispatch(LoginUserAction.User_Fail(error.response.data))
    }
};

// Load User
export const LoadUser = () => async (dispatch) => {

    try {
        dispatch(LoginUserAction.Load_User_Request())

        const user = await axios.get("/api2/v1/user/me")

        dispatch(LoginUserAction.Load_User_Success(user.data))
    } catch (error) {
        dispatch(LoginUserAction.Load_User_Fail(error.response.data))
    }
}

// Get All User Admin
export const AllUsers = () => async (dispatch) => {
    try {
        dispatch(AllUserACtion.All_Users_Request())

        const user = await axios.get("/api2/v1/user/admin/users")
        console.log(user)
        dispatch(AllUserACtion.All_Users_Success(user.data))
    } catch (error) {
        dispatch(AllUserACtion.All_Users_Fail(error.response.data))
    }
}

// LogOut User 
export const logOutUser = () => async (dispatch) => {
    try {
        dispatch(LoginUserAction.LoguOut_Request());

        const data = await axios.get("/api2/v1/user/logout")
        console.log("logout", data)
        dispatch(LoginUserAction.LoguOut_Success(data.data))
    } catch (error) {
        dispatch(LoginUserAction.LoguOut_Fail(error.response.data))
    }
}

// Update Password
export const updateUserPassword = (password) => async (dispatch) => {
    try {
        dispatch(updatePasswordAction.Update_Password_Request())

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const data = await axios.post("/api2/v1/user/updatePassword", password, config)
    
        dispatch(updatePasswordAction.Update_Password_Success(data.data))

    } catch (error) {
        dispatch(updatePasswordAction.Update_Password_Fail(error.response.data))
    }
};

// Forgot Password
export const ForgotPasswordHandle = (email) => async (dispatch) => {
    try {
        dispatch(ForgotPasswordAction.Forgot_Password_Request())
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const data = await axios.post("/api2/v1/user/password/forgot", email, config)

        dispatch(ForgotPasswordAction.Forgot_Password_Success(data.data))
    } catch (error) {
        dispatch(ForgotPasswordAction.Forgot_Password_Fail(error.response.data))
    }
};

// Reset Password
export const ResetPasswordHandle = (token, password) => async (dispatch) => {
    try {
        dispatch(ResetPasswordAction.Reset_Password_Request())
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const data = await axios.post(`/api2/v1/user/password/forgot/${token}`, password, config );

    dispatch(ResetPasswordAction.Reset_Password_Success(data.data))
    } catch (error) {
        dispatch(ResetPasswordAction.Reset_Password_Fail(error.response.data))
    }
    

}