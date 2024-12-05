import {configureStore} from '@reduxjs/toolkit'
import { getVideo, videoContent } from './Reducer/ContentReducer';
import { AllUsers, ForgotPasswordReducer, LoginUser, RegisterUser, ResetPasswordReducer, updatePasswordReducer } from './Reducer/UserReducer';

const createStore = configureStore({
    reducer: {
        videoReducer : videoContent.reducer,
        getVideo : getVideo.reducer,
        LoginUser: LoginUser.reducer,
        allUsers: AllUsers.reducer,
        registerUser: RegisterUser.reducer,
        updatePassword: updatePasswordReducer.reducer,
        forgotPassword: ForgotPasswordReducer.reducer,
        resetPassword: ResetPasswordReducer.reducer,
    }
});

export default createStore;