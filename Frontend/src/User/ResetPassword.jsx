import React, { Fragment, useEffect, useState } from 'react'
import Loader from '../Component/utilis/Loading';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Alert from '@mui/material/Alert'
import "./LoginSignUp.scss"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ResetPasswordHandle } from '../Action/UserActions';
import { ResetPasswordAction } from '../Reducer/UserReducer';

const ResetPassword = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const {loading, error, success} = useSelector((state)=> state.resetPassword)

    const [open, setOpen] = useState(false)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmiPassword] = useState("")
    const [alertMessage, setAlertMessage] = useState("")
    const [verifyMessage, setVerifyMessage]= useState("")
    const token = params.token

    const ResetPasswordSubmit = (e)=>{
        e.preventDefault();
        const resetForm = new FormData();
        resetForm.set("password", password)

        if (password !== confirmPassword) {
            return setVerifyMessage("NewPassword and Confirm Password Not Match")
        }
        setVerifyMessage(null)
        
        dispatch(ResetPasswordHandle(token, resetForm))
    }


    useEffect(()=>{
        if(error){
            setOpen(true)
            console.log(error)
            setTimeout(() => {
                setAlertMessage(error.message)
                setOpen(false)
                dispatch(ResetPasswordAction.Reset_Password_Clear_Errors())
            }, 4000);
        }
        if(success){
            setOpen(true)
            setTimeout(() => {
                setAlertMessage("Password Update Successfully")
                setOpen(false)
                dispatch(ResetPasswordAction.Reset_Password_Clear_Errors())
                navigate("/login")
            }, 4000);
        }
    },[error, success, dispatch, setOpen, setAlertMessage])

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
                            <p style={{ color: "tomato" }}>{verifyMessage}</p>
                            <div className="loginPassword">
                                <LockOpenIcon />
                                <input type="password" placeholder='New Password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="loginPassword">
                                <LockOpenIcon />
                                <input type="password" placeholder='Confirm Password' required value={confirmPassword} onChange={(e) => setConfirmiPassword(e.target.value)} />
                            </div>
                            <input type="submit" value="Reset Password" className='loginBtn' />
                        </form>
                    </div>
                </div>
            </Fragment>}
        </Fragment>
    )
}

export default ResetPassword