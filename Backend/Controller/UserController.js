import UserModal from "../Modals/UserModal.js";
import catchAsyncError from "../utilis/catchAsyncError.js";
import ErrorHandle from "../utilis/errorHandle.js";
import sendToken from "../utilis/jwtToken.js";
import sendMail from "../utilis/sendMail.js";
import crypto from "crypto"

// Register User
export const RegisterUser = catchAsyncError(async (req, res) => {
    const { name, email } = req.body

    const password = crypto.randomBytes(8).toString("hex")

    const data = await UserModal.create({ name, email, password })


    const subject = `Congrats!! You Are Register As Bitmonkey User`

    const loginLink = `${req.protocol}://${req.get("host")}/login`

    const content = `
        <h1>Congrats!! You are Register on Bitmonkey </h1>
      <p>You have your details below</p> 
      <ol> 
        <li><b>Your Email :</b ${email}</li>
        <li><b>Your Name :</b> ${name}</li>
        <li><b>Your password :</b> ${password}</li>
      </ol>
      <p>You can Login Via below given login</p>
      <a href=${loginLink}>Login</a>
    `

    sendMail(email, subject, content)

    res.status(201).json({ success: true, message: `User Created Successfully`, })
})

// Login User
export const loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body

    if (!email) {
        return next(new ErrorHandle("Please Enter Email", 400))
    } else if (!password) {
        return next(new ErrorHandle("Please Enter Password", 400))
    }

    const user = await UserModal.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandle("Invalid Email or Password"), 401)
    }
    const isPasswordMatch = await user.comparePassword(password)
    if (!isPasswordMatch) {
        return next(new ErrorHandle("Invalid User Password", 401))
    }

    sendToken(user, 200, res)
})

// Get User Details 
export const getUserDetail = catchAsyncError(async (req, res) => {
    const user = await UserModal.findById(req.user.id)

    res.status(200).json({ success: true, user })
})

// Get All Users {Admin}
export const getAllUser = catchAsyncError(async (req, res) => {
    const user = await UserModal.find();

    res.status(200).json({ success: true, user })
})

// Send Mail
export const addUser = catchAsyncError(async (req, res, next) => {
    const { email } = req.body

    const user = await UserModal.findOne({ email })

    if (user) {
        return next(new ErrorHandle("User Already Exist", 404))
    }

    // Get Register Token
    // const registerToken = user.registerUserToken()
    // console.log(registerToken)
    const registerToken = crypto.randomBytes(20).toString("hex")

    console.log(registerToken)
    // await user.save({validateBeforeSave: false})

    const registerUrl = `${req.protocol}://${req.get("host")}/api/v1/register/${registerToken}`
    const subject = "Invited For Bitmonkey Admin"

    const content = `<h1>Congrats!! You are invite as a Bitmonkey Admin</h1> <p>You click bellow here to register yourself as a Bitmonkey Admin</p> <a href=${registerUrl}>Register as admin</a>`


    try {
        await sendMail(email, subject, content)
        res.status(200).json({ succss: true, message: `Email Sent To ${email} Successfully`, link: registerUrl })

    } catch (error) {
        console.log(error)
        user.registerToken = undefined
        user.registerTokenExpired = undefined

        user.save({ validateBeforeSave: false })
        return next(new ErrorHandle("Email not Sent", 500))
    }
})


// Logout User
export const logoutUser = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        httpOnly: true,
        expires: new Date(Date.now())
    })

    res.status(200).json({success: true, message: "Logout Successfully"})
})

// Update Password
export const updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await UserModal.findById(req.user).select("+password")

    const isPasswordMatch = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatch){
        return next (new ErrorHandle("Old Password not match", ))
    }

    user.password = req.body.newPassword

    await user.save()
    sendToken(user, 200, res)
})

// Reset Password Token Generate
export const ResetPasswordToken = catchAsyncError(async (req, res, next) => {
    const user = await UserModal.findOne({email: req.body.email});
    if(!user){
        return next(new ErrorHandle("User Not Found", 404))
    }

    // Get ResetPassword Token
    const ResetPasswordToken = user.getResetToken()

    await user.save({validateBeforeSave: true});

    const ResetPasswordUrl = `${process.env.FRONTEND_URL}/password/forgot/${ResetPasswordToken}`

    const content = `
        <h1>Hey ${user.name}!! You are Request for Reset Password </h1>
      <p>Please Click Below Link And Reset Your Password. note:-this link is valid for only 10 min.</p> 
      <a href=${ResetPasswordUrl}><b>Reset Password</b></a>
    `
    const subject = "BitMonkey Password Recovery"
    try {
        await sendMail(user.email,subject, content )
        res.status(200).json({
            success: true,
            message: `Email Sent to ${user.email} Sucessfully`
        })
    } catch (error) {
     user.ResetToken = undefined;
     user.ResetTokenExpired= undefined;   

     await user.save({validateBeforeSave: true});
     return next(new ErrorHandle(error.message, 500))
    }
});

// Reset Password
export const ResetPassword = catchAsyncError(async (req, res, next) => {
    const ResetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user =await UserModal.findOne({
        ResetToken: ResetPasswordToken,
        ResetTokenExpired: {$gt: Date.now()},
    })

    if(!user){
        return next(new ErrorHandle("Reset Password Token is invalid or has been expired", 400))
    }

    user.password= req.body.password;
    user.ResetToken = undefined;
    user.ResetTokenExpired = undefined;

    await user.save()
    sendToken(user, 200, res)
})

// Delete User
export const DeleteUser = catchAsyncError(async (req, res, next)=> {
    const user = await UserModal.findByIdAndDelete(req.params.id);

    res.status(200).json({succsss: true, message: "User Delete Successfully"})
})
