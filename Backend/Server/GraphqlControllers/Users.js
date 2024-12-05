import UserModal from '../../Modals/UserModal.js';
import ErrorHandle from '../../utilis/errorHandle.js';
import WraphAsyncError from '../MiddlewareGraphql/WraphAsync.js';
import { withAuth } from '../Token/jwtTokenGraphql.js';
import { AuthroizeAndAuthenticateUser, isAuthenticateUser} from '../MiddlewareGraphql/AuthUser.js';
import sendMail from '../../utilis/sendMail.js';
import crypto from 'crypto'


// Register User by Graphql
export const RegisterUser = WraphAsyncError(async (_, { name, email, password }) => {
  if (!name || !email || !password) {
    throw new ErrorHandle("Please Enter User basic detail", 400)
  }

  const data = await UserModal.create({ name, email, password })

  const subject = `Congrats!! You Are Register As Bitmonkey User`

  const loginLink = process.env.REGISTER_LINK

  const content = `
        <h1>Congrats!! You are Register on Bitmonkey </h1>
      <p>You have your details below</p> 
      <ol> 
      <li><b>Your Name :</b> ${name}</li>
        <li><b>Your Email :</b ${email}</li>
        <li><b>Your password :</b> ${password}</li>
      </ol>
      <p>You can Login Via below given login</p>
      <a href=${loginLink}>Login</a>
    `

  // sendMail(email, subject, content)

  return "User Created Successfully"
});

// Login User
export const LoginUserGraphql = WraphAsyncError(async (parent, { email, password }, context) => {
  if (!email) {
    throw new ErrorHandle("Please Enter Your Email", 400)
  } else if (!password) {
    throw new ErrorHandle("Please Enter Your Password", 400)
  }
  const User = await UserModal.findOne({email }).select("+password");
  // console.log(email, password, User)
  if (!User) {
    throw new ErrorHandle("User Not Found", 400)
  }
  const comparePassword = await User.comparePassword(password);
  if (!comparePassword) {
    throw new ErrorHandle("Invalid Password", 400)
  }

  // return createTokenGraphql(User)
  return withAuth(parent, User, context)
});

// Get User Detail
export const UserDetails = WraphAsyncError(async (_, arg, context) => {
  const user = await isAuthenticateUser(context)
  return user
});

// Get All User {Admin}
export const getAllUsers = WraphAsyncError(async (_, arg, context) => {
  await AuthroizeAndAuthenticateUser("admin", "user")(context)
  const users = await UserModal.find()
  return users
});

// LogOut User 
export const LogOutUser = WraphAsyncError((_, arg, context) => {
  context.res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now())
  })

  return "Logout Successfully"
});

// Update Password
export const updatePassword = WraphAsyncError(async (_, arg, context) => {
  const user = await isAuthenticateUser(context);
  const User = await UserModal.findById(user._id).select("+password")

  const isPasswordMatch = await User.comparePassword(arg.oldPassword);
  if (!isPasswordMatch) {
    throw new ErrorHandle("Old Password Not Match", 400)
  }
  User.password = arg.newPassword
  await User.save()
  return "Password Updated Successfully"
});

// Reset Password Token Generate
export const ResetPasswordToken = WraphAsyncError(async (_, arg, context) => {
  const user = await UserModal.findOne({ email: arg.email });
  if (!user) {
    throw new ErrorHandle("User Not Found", 400)
  }
  // Get ResetPassword Token
  const ResetToken = user.getResetToken();
  await user.save({validateBeforeSave: true})

  const ResetPasswordUrl = `${process.env.FRONTEND_URL}/password/forgot/${ResetToken}`

  const content = `
        <h1>Hey ${user.name}!! You are Request for Reset Password </h1>
      <p>Please Click Below Link And Reset Your Password. note:-this link is valid for only 10 min.</p> 
      <a href=${ResetPasswordUrl}><b>Reset Password</b></a>
    `
  const subject = "BitMonkey Password Recovery"

  try {
    await sendMail(user.email, subject, content)
    return `Email Sent to ${user.email} Successfully`
  } catch (error) {
    user.ResetToken = undefined
    user.ResetTokenExpired = undefined

    await user.save({validateBeforeSave: true})
    return (new ErrorHandle(error.message, 400))
  }
});

// Reset Password
export const ResetPassword = WraphAsyncError(async(_, arg, context)=>{
  const ResetPasswordToken = crypto.createHash("sha256").update(arg.token).digest("hex")

  const user = await UserModal.findOne({
    ResetToken: ResetPasswordToken,
    ResetTokenExpired: {$gt: Date.now()},
  })

  if(!user){
    throw new ErrorHandle("Reset Password Token is invalid or has been expired", 400)
  }

  user.password = arg.password
  user.ResetToken = undefined
  user.ResetTokenExpired = undefined

  await user.save()
  return "Password Reset Successfully"
});

// Delete User
export const DeleteUser = WraphAsyncError(async(_, arg, context)=>{
  await AuthroizeAndAuthenticateUser("admin", "user")(context)
  const user = await UserModal.findById(arg.id);
  if(!user){
    throw new ErrorHandle("User not found", 400)
  }
  if(user.role === "root admin"){
    throw new ErrorHandle("You Can't Delete Root Admin", 400)
  }

  
  await UserModal.findByIdAndDelete(user._id);
  return "User Delete Successfully"
});

// Update User Profile by Graphql
export const UpdateUser = WraphAsyncError(async (_, arg, context) => {
  await AuthroizeAndAuthenticateUser("Admin", "Root Admin", "user")(context)
  const user = await UserModal.findById(arg.id);
  if (!user) {
    throw new ErrorHandle("User Not Found", 400)
  }
  const updateUser = await UserModal.findByIdAndUpdate(arg.id,{name: arg.name, email: arg.email, role: arg.role}, {new: true});
  if(!updateUser){
    throw new ErrorHandle("Please Enter User Details", 400)
  }
  return {user, message:"User Update Successfully"}
})