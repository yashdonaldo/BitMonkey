import React, { Fragment, useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import './userProfile.scss'
import { useDispatch, useSelector } from 'react-redux'
import { logOutUser } from '../../../Action/UserActions'
import { useNavigate } from 'react-router-dom'
import UpdatePassword from './UpdatePassword'

const UserProfile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [modalOpen, setModalOpen] = useState(false);
    const { isAuthenticate, error, loading, user } = useSelector((state) => state.LoginUser)

    const logOutAction = () => {
        dispatch(logOutUser())   
        navigate("/")
    }

    const showModal = (value) => {
        setModalOpen(true)
        if (value == false) {
            setModalOpen(value)
        }
    }

    return (
        <Fragment>
            <div className="dashboard">
                <Sidebar />

                <section className='userProfile'>
                    <div className="background1"></div>
                    <div className="background2"></div>
                    <div className="userinfo">
                        <figure>
                            <img src="https://reflectionscc.com/wp-content/uploads/2018/10/blank-male-silhouette.jpg" alt="profile" width={180} height={180} />
                        </figure>


                        <div className="details">
                            <p id='name'><span><b>Your Name :</b></span> {user && user.name}</p>
                            <p id='email'><span><b>Your Email :</b></span> {user && user.email}</p>
                            <p id='email'><span><b>Your Role :</b></span> {user && user.role}</p>

                            <div className="btn">
                                <button onClick={showModal}>Update Password</button>
                                <button onClick={logOutAction}>Log Out</button>
                            </div>
                        </div>
                    </div>
                    {modalOpen && <UpdatePassword showModal={showModal} />}
                </section>

            </div>
        </Fragment>
    )
}

export default UserProfile
