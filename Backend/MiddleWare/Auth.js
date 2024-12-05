import catchAsyncErrors from "../utilis/catchAsyncError.js"
import ErrorHandle from "../utilis/errorHandle.js"
import JWT from "jsonwebtoken"
import User from "../Modals/UserModal.js"


export const isAuthenticateUser = catchAsyncErrors(async (req, res, next) => {
    const {token} = req.cookies;


    if(!token){ 
        return next(new ErrorHandle("Please First Login To Access Resources", 401))
    }

    const decodeData = JWT.verify(token, process.env.JWT_SECRET_KEY)

    req.user = await User.findById(decodeData.id)

    next()
});


export const authorizeRoles = (...roles) => {
    return(req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return next (new ErrorHandle(`Role: ${req.user.role} is not allow to access this resources`, 403))
        }
        next()
    }
}