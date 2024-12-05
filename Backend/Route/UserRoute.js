import express from 'express';
import { RegisterUser, loginUser, getUserDetail, getAllUser, addUser, logoutUser, updatePassword, ResetPasswordToken, ResetPassword, DeleteUser } from  '../Controller/UserController.js';
import { isAuthenticateUser, authorizeRoles } from '../MiddleWare/Auth.js';
const router = express.Router();

router.route("/register").post(RegisterUser)
router.route("/login").post(loginUser)
router.route("/me").get( isAuthenticateUser, authorizeRoles("user") ,getUserDetail)
router.route("/admin/users").get(isAuthenticateUser,authorizeRoles("admin") ,getAllUser)
router.route("/add").post(addUser);
router.route("/logout").get(logoutUser)
router.route("/updatePassword").post(isAuthenticateUser, updatePassword);
router.route("/password/forgot").post(ResetPasswordToken)
router.route("/password/forgot/:token").post(ResetPassword)
router.route("/user/delete/:id").delete(DeleteUser)

export default router;