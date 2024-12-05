import ErrorHandle from "../../utilis/errorHandle.js"

const WraphAsyncError = (resolver)=>(async(parent, arg, context, info)=>{
    try {
        return await resolver(parent, arg, context, info);
    } catch (error) {
        throw new ErrorHandle(error.message, 400);
    }
})

export default WraphAsyncError;