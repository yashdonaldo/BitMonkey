import UserModal from "../../Modals/UserModal.js";
import ErrorHandle from "../../utilis/errorHandle.js";
import WraphAsyncError from "../MiddlewareGraphql/WraphAsync.js";
import JWT from 'jsonwebtoken'

// Authenticate User by login
export const isAuthenticateUser = WraphAsyncError(async(context) => {
    const {token} = context.req.cookies;
    if(!token){
        throw new ErrorHandle("Plese login to Access the recources", 400)
    }

    const decodeData = JWT.verify(token, process.env.JWT_SECRET_KEY);
    const user = await UserModal.findById(decodeData.id);
    if(!user){
        throw new ErrorHandle("User Not Found")
    }
    return user;
});

// Authorize User
export const isAuthorizeRole = (allowRole)=>{
    return (user) =>{
        if(!allowRole.includes(user.role)){
            throw new ErrorHandle(`Role: ${user.role} not allowed to access this resource`)
        }
    }
}

// Authentcate And Authorize
export const AuthroizeAndAuthenticateUser = (...allowRole) => async(context)=>{
    const user = await isAuthenticateUser(context);
    // console.log(allowRole)
    isAuthorizeRole(allowRole)(user);
    return {success: true, user}
}