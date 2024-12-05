import ErrorHandle from "../../utilis/errorHandle.js";
import WraphAsyncError from "../MiddlewareGraphql/WraphAsync.js";

const createTokenGraphql = async(user)=>{
    const token = user.getJWTToken();

    // cookie option
    const cookieOption = {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        // sameSite: 'None', // Adjust according to your needs
        expires: new Date(Date.now() + process.env.COKKIE_EXPIRE * 24 * 60 * 60 * 3600), // Ensure this is in milliseconds
    }
    return {
        success: true,
        token,
        user,
        cookieOption
    }
}

// Middleware to set cookie in GraphQL context
const setTokenCookie = async(res, token, option)=>{
    res.cookie("token", token, option);
}

// GraphQL resolver wrapper for authentication
const withAuth = WraphAsyncError(async (parent, arg, context, info)=>{
    const {res} = context;
    const user = arg;

    if(!user){
        throw new ErrorHandle("User Data not provided", 400)
    }

    const tokenResponse = createTokenGraphql(user);

    // set the cookie
    setTokenCookie(res, (await tokenResponse).token, (await tokenResponse).cookieOption)

    return {
        success: true,
        user: (await tokenResponse).user,
        token: (await tokenResponse).token
    }

})

export {withAuth, setTokenCookie, createTokenGraphql}