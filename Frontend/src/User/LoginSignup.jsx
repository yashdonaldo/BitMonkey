
import React, { Fragment, useEffect, useRef, useState, } from 'react';
import { useNavigate } from 'react-router-dom'
import "./LoginSignUp.scss"
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import Loader from '../Component/utilis/Loading';
import Alert from '@mui/material/Alert'
import { LoginUserAction } from '../Reducer/UserReducer';
import { useLoginUser } from '../Graphql/Controller/UserCntroller';

const LoginSignUp = () => {
    const navigate = useNavigate()
    const { LoginUser, data, loading } = useLoginUser()
    const dispatch = useDispatch()
    const { isAuthenticate, error } = useSelector((state) => state.LoginUser)

    const loginTab = useRef(null);
    const [open, setOpen] = useState(false)

    const [email, setLoginEmail] = useState("")
    const [password, setLoginPassword] = useState("")
    const [message, setMessage] = useState("")

    const loginSubmit = async(e) => {
        e.preventDefault(); 
        await LoginUser(email, password, dispatch)
    }


    const redirect = location.search ? location.search.split("=")[1] : "/admin/dashboard"

    useEffect(() => {
        console.log("useeffect",isAuthenticate, error)
        if(error){
            setMessage(error)
            setOpen(true)
            setTimeout(() => {
                dispatch(LoginUserAction.User_Fail(null))
                setOpen(false)
            }, 4000);
        }
        if(!loading && isAuthenticate){
            navigate(redirect)
        }
    }, [isAuthenticate,error])

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    {open && <Alert severity={"info"}>{message && message}</Alert>}
                    <div className='LoginSignUpContainer'>
                        <div className="LoginSignUpBox">
                            <div className="login-setup-toggle">
                                <p>Login</p>
                            </div>
                            <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                                <div className="loginEmail">
                                    <MailOutlineIcon />
                                    <input type="email" placeholder='Email' required value={email} onChange={(e) => setLoginEmail(e.target.value)} />

                                </div>
                                <div className="loginPassword">
                                    <LockOpenIcon />
                                    <input type="password" placeholder='Password' required value={password} onChange={(e) => setLoginPassword(e.target.value)} />
                                </div>
                                <Link to="/password/forgot">Forgot Password?</Link>
                                <input type="submit" value="Login" className='loginBtn' />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>

    )
}

export default LoginSignUp
