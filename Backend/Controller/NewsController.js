import News from '../Modals/NewsModal.js'
import catchAsyncError from "../utilis/catchAsyncError.js";


export const Newslist = catchAsyncError(async (req, res, next)=> {
    // const news = await News.create(req.body)
    // console.log(req.body)
    res.status(201).json({
        success: true,
        message: "News List is ok"
    })
});