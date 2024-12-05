import React, { Fragment, useEffect, useState } from 'react'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import "./LoginSignUp.scss"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ForgotPasswordHandle } from '../Action/UserActions';
import Loader from '../Component/utilis/Loading';
import Alert from '@mui/material/Alert'
import { ForgotPasswordAction } from '../Reducer/UserReducer';

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [open, setOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const dispatch = useDispatch()

    const { loading, error, message } = useSelector((state) => state.forgotPassword)

    const ResetPasswordSubmit = (e) => {
        e.preventDefault();
        const forgotForm = new FormData();
        forgotForm.set("email", email)

        dispatch(ForgotPasswordHandle(forgotForm))
    };

    useEffect(() => {
        if(error){
            setOpen(true)
            setTimeout(() => {
                setAlertMessage(error.message)
                setOpen(false)
                dispatch(ForgotPasswordAction.Forgot_Password_Clear_Errors())
            }, 3000);
        }
        if(message){
            setOpen(true)
            setTimeout(() => {
                setAlertMessage(message.message)
                setOpen(false)
                dispatch(ForgotPasswordAction.Forgot_Password_Clear_Errors())
            }, 3000);
        }
     }, [error, message, dispatch])
    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                {open && <Alert severity={!error ? "success" : "error"}>{alertMessage}</Alert>}
                <div className='LoginSignUpContainer'>
                    <div className="LoginSignUpBox">
                        <div className="login-setup-toggle">
                            <p>Reset Password</p>
                        </div>
                        <form className='loginForm' onSubmit={ResetPasswordSubmit}>
                            <div className="loginEmail">
                                <MailOutlineIcon />
                                <input type="email" placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <Link to="/login">Back To Login?</Link>
                            <input type="submit" value="Forgot Password" className='loginBtn' />
                        </form>
                    </div>
                </div>
            </Fragment>}
        </Fragment>
    )
}

export default ForgotPassword
