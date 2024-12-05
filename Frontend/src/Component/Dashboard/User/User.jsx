import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import { Alert, Button } from '@mui/material';
import Sidebar from '../Sidebar'
import Loader from '../../utilis/Loading';
import { DataGrid } from '@mui/x-data-grid'
import "./User.scss";
import Modal from '../../utilis/Modal';
import { AllUserACtion, RegisterUserAction } from '../../../Reducer/UserReducer';
import { useAllUsers, useDeleteUser } from '../../../Graphql/Controller/UserCntroller';


const UserList = () => {
    const dispatch = useDispatch();

    const { error, users, loading } = useSelector((state) => state.allUsers)
    const { data: deleteData, loading: deleteLoading, error: deleteError, Delete: DeleteUser, reset } = useDeleteUser()
    const { data ,refetch} = useAllUsers(dispatch)

    const [modalOpen, setModalOpen] = useState(false);
    const [message, setMessage] = useState()
    const [open, setOpen] = useState(false)

    const deleteProductHandle = async (id) => {
        await DeleteUser(id)
        refetch()
    }

    const showModal = (value) => {
        setModalOpen(true)
        if (value == false) {
            setModalOpen(value)
        }
    }

    const RefreshUser = () => {
        refetch()
    }

    useEffect(() => {
        if (error || deleteError ) {
            console.log("open", error, deleteError.message)
            setOpen(true)
            setMessage(error || deleteError.message )
            setTimeout(() => {
                setOpen(false)
                setMessage(null)
                dispatch(AllUserACtion.All_Users_Clear_Errors())
            }, 4000);
        }
        
        if(deleteData){
            setOpen(true)
            setMessage(deleteData.DeleteUser)
            setTimeout(() => {
                setOpen(false)
                setMessage(null)
                reset()
            }, 4000);
        }

    }, [error, deleteError,deleteData])


    const coloumns = [
        { field: "id", headerName: "User ID", minWidth: 200, flex: 0.5 },
        { field: "name", headerName: "Name", minWidth: 200, flex: 1 },
        {
            field: "role", headerName: "Role", minWidth: 150, flex: 0.3, cellClassName: (params) => {
                return params.row.role === "admin" || params.row.role === "root admin" ? "greenColor" : "redColor";
            }
        },
        { field: "email", headerName: "Email", minWidth: 200, flex: 0.5 },
        {
            field: "action", headerName: "Actions", minWidth: 150, sortable: false, type: "number",
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/users/${params.id}`}> <Edit /> </Link>

                        <Button onClick={() => deleteProductHandle(params.id)}><Delete /></Button>
                    </Fragment>
                )
            }
        },
    ];

    const rows = [];

    users && users.forEach((item) => {
        rows.push({
            id: item._id,
            role: item.role,
            name: item.name,
            email: item.email,
        })
    });

    return (
        <Fragment>
            <div className="dashboard">
                <Sidebar />

                <div className="productListContainer">
                    {loading || deleteLoading? (<Loader />) : (
                        <Fragment>
                            {open ? (<Alert severity={error || deleteError ? "error" : "success"} style={{ position: "sticky", top: "0px", zIndex: "10" }}> {message} </Alert>) : ("")}
                            <h1>All Users</h1>
                            <button onClick={RefreshUser}>Refresh</button>
                            <button onClick={showModal}>Add User</button>
                            <DataGrid rows={rows} rowHeight={180} columns={coloumns} pageSizeOptions={10} disableRowSelectionOnClick className='productListTable' autoHeight />

                            {modalOpen && <Modal showModal={showModal} />}
                        </Fragment>
                    )}
                </div>
            </div>
        </Fragment>
    )
}


export default UserList