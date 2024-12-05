import React, { Fragment, useEffect, useState } from 'react'
import './updatePassword.scss'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserPassword } from '../../../Action/UserActions';
import { Alert } from '@mui/material';
import { updatePasswordAction } from '../../../Reducer/UserReducer';

const UpdatePassword = (props) => {
    const { showModal } = props
    const dispatch = useDispatch()
    const {error, loading, user, isUpdated} = useSelector((state)=> state.updatePassword)

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const [message, setMessage] = useState("")
    const [open, setOpen] = useState(false)

    const hideModal = () => {
        showModal(false)
    }

    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData()

        myForm.set("oldPassword", oldPassword)
        myForm.set("newPassword", newPassword)

        if (newPassword !== confirmPassword) {
            return setMessage("NewPassword and Confirm Password Not Match")
        }
        setMessage(null)
        dispatch(updateUserPassword(myForm))
    }

    useEffect(()=>{
        if(error){
            setMessage(error.message)
        }
        if(isUpdated){
            setMessage(null)
            setOpen(true)
            setTimeout(() => {
                setOpen(false)
                dispatch(updatePasswordAction.Update_Password_Reset())
                showModal(false)
            }, 3000);
        }
    }, [error, user, isUpdated])




return (
    <Fragment>
        <div className="modal" id='toggle-close'>
            <div className="tittle">
                <h2>Update Password</h2>
                <button onClick={hideModal} style={{ border: "none" }}><CloseIcon /></button>
            </div>
            <div className="input">
                <form onSubmit={updatePasswordSubmit}>
                    <p style={{ color: "tomato" }}>{message}</p>
                    {open ? (<Alert severity="success" style={{ position: "sticky", top: "0px", zIndex: "10" }}> Password Update Successfully </Alert>) : ("")}
                    <input type="password" name="oldPassword" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder='Enter Old Password' required />
                    <input type="password" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='Enter New Password' required />
                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} placeholder='Enter Confirm Password' required />
                    <div className="submit">
                        <button className='close' onClick={hideModal}>Close</button>
                        <button className='submit-btn' >Update</button>
                    </div>
                </form>
            </div>
        </div>
    </Fragment>
)
}

export default UpdatePassword
