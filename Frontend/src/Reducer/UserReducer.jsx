import { createSlice } from '@reduxjs/toolkit'


// Login User Reducer
const LoginUser = createSlice({
    name: "loginUser",
    initialState: {loading: false, isAuthenticate: false, user: null, error: null, message: null},
    reducers: {

        // Login User
        User_Request: (state, actions) => {
            state.loading = true
        },
        User_Success: (state, actions) => {
            state.loading = false,
            state.isAuthenticate = true,
            state.user = actions.payload
        },
        User_Fail: (state, actions) => {
            state.loading = false,
            state.isAuthenticate = false,
            state.error = actions.payload
        },
        User_Clear_Errors: (state, actions) => {
            state.error = null
        },

        // Load User
        Load_User_Request: (state, actions) => {
            state.loading = true
        },
        Load_User_Success: (state, actions) => {
            state.loading = false,
            state.isAuthenticate = true,
            state.user = actions.payload
        },
        Load_User_Fail: (state, actions) => {
            state.loading = false,
            state.error = actions.payload
        },
        Load_User_Clear_Errors: (state, actions) => {
            state.error = null
        },

        // Logout User
        LoguOut_Request: (state, actions)=>{
            state.loading = true
        },
        LoguOut_Success: (state, actions)=>{
            state.loading = false,
            state.user = null
            state.isAuthenticate = false
            state.message = actions.payload
        },
        LoguOut_Fail: (state, actions)=>{
            state.loading = false
            state.error = actions.payload
        },
    }
})

// Register User
const RegisterUser = createSlice({
    name: "registerUser",
    initialState: {loading : false, user: null, error: null, isAuthenticate: false},
    reducers: {
        Register_User_Request: (state, actions) => {
            state.loading = true
        },
        Register_User_Success: (state, actions) => {
            state.loading = false,
            state.isAuthenticate = true,
            state.user = actions.payload
        },
        Register_User_Fail: (state, actions) => {
            state.loading = false,
            state.isAuthenticate = false,
            state.error = actions.payload
        },
        Register_User_Clear_Errors: (state, actions) => {
            state.error = null
        },
    }
})

// get All user
const AllUsers = createSlice({
    name: "allUsers",
    initialState: {loading: false, error: null, users: null},
    reducers: {
        All_Users_Request: (state, action)=>{
            state.loading = true
        },
        All_Users_Success: (state, action) => {
            state.loading = false,
            state.error = null, 
            state.users = action.payload
        },
        All_Users_Fail: (state, actions) => { 
            state.loading = false,
            state.error = actions.payload
        },
        All_Users_Clear_Errors: (state, actions) => {
            state.loading = false,
            state.error = null
        }
    }
})

// update Password reducer
const updatePasswordReducer = createSlice({
    name: "updatePassword",
    initialState: {loading: false, error: null, user: null, isUpdated:false},
    reducers: {
        Update_Password_Request: (state, actions) => {
            state.loading = true
        },
        Update_Password_Success: (state, actions) => {
            state.loading = false,
            state.user = actions.payload,
            state.isUpdated = true
        },
        Update_Password_Fail: (state, actions) => {
            state.loading = false,
            state.error = actions.payload
        },
        Update_Password_Reset: (state) => {
            state.isUpdated = false
        }
    }
})

// Forgot Password
const ForgotPasswordReducer = createSlice({
    name: "forgotPassword",
    initialState: {loading: false, error: null, message: null},
    reducers: {
        Forgot_Password_Request: (state, actions)=>{
            state.loading = true
        },
        Forgot_Password_Success: (state, actions) => {
            state.loading = false,
            state.message = actions.payload
        },
        Forgot_Password_Fail :(state, actions) => {
            state.loading = false,
            state.error = actions.payload
        },
        Forgot_Password_Clear_Errors: (state, actions) => {
            state.error = null,
            state.message = null
        }
    }
})


// Reset Password
const ResetPasswordReducer = createSlice({
    name: "ResetPassword",
    initialState: {loading: false, error: null, success: false, user:null},
    reducers: {
        Reset_Password_Request: (state, actions)=>{
            state.loading = true
        },
        Reset_Password_Success: (state, actions) => {
            state.loading = false,
            state.success = true
            state.user = actions.payload
        },
        Reset_Password_Fail :(state, actions) => {
            state.loading = false,
            state.error = actions.payload
        },
        Reset_Password_Clear_Errors: (state, actions) => {
            state.error = null,
            state.success = false
        }
    }
})




export const LoginUserAction = LoginUser.actions;
export const AllUserACtion = AllUsers.actions;
export const RegisterUserAction = RegisterUser.actions;
export const updatePasswordAction = updatePasswordReducer.actions;
export const ForgotPasswordAction = ForgotPasswordReducer.actions;
export const ResetPasswordAction = ResetPasswordReducer.actions;

export {LoginUser, AllUsers, RegisterUser, updatePasswordReducer, ForgotPasswordReducer, ResetPasswordReducer}