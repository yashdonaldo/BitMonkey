import React, { Fragment, useEffect, useState } from 'react'
import './Modal.scss'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { useRegisterUser } from '../../Graphql/Controller/UserCntroller';

const Modal = (props) => {
    const { showModal } = props
    const dispatch = useDispatch()
    const {data, loading, error, RegisterUser} = useRegisterUser()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState(null)

    const hideModal = () => {
        showModal(false)
    }

    const registerSubmit = (e) => {
        e.preventDefault();
        RegisterUser(name, email, password, dispatch)
    }

    useEffect(()=>{
        if(data){
            setMessage(data.registeruser)
        }
        if(error){
            setMessage(error.message)
        }
    })


    return (
        <Fragment>
            <div className="modal" id='toggle-close'>
                <div className="tittle">
                    <h2>Add User</h2>
                    <button onClick={hideModal} style={{ border: "none" }}><CloseIcon /></button>
                </div>
                <div className="message">
                    <h3 style={error? ({color:"red", fontWeight:"bold"}):({color:"green", fontWeight:"bold"})}>{message}</h3>
                </div>
                <div className="input">
                    <form onSubmit={registerSubmit}>
                        <input type="text" name="name" id="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter User Name' />
                        <input type="email" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter User Email' />
                        <input type="password" name="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter User Password' />
                        <div className="submit">
                            <button className='close' onClick={hideModal}>Close</button>
                            <button className='submit-btn' disabled={loading? true : false}>{loading? "Loading..." : "Register"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Modal
