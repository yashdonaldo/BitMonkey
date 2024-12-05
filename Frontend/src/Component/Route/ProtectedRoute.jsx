import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = (props) => {
    const navigate = useNavigate()
    const { Component, isAdmin } = props
    const { isAuthenticate, error, loading, user } = useSelector((state) => state.LoginUser)

    if (isAdmin === true && user.role === "admin") {
        navigate("/admin/dashboard")
    }

    return (
        <Fragment>
            {isAuthenticate ? <Component /> : navigate("/login")}
        </Fragment>
    )
}

export default ProtectedRoute
