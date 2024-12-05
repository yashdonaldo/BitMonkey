import React, { Fragment, useEffect, useState } from 'react';
import './UpdateUser.scss';
import Sidebar from '../Sidebar'
import People from '@mui/icons-material/People';
import Email from '@mui/icons-material/Email';
import VerifiedUser from '@mui/icons-material/VerifiedUser';
import { useParams } from 'react-router-dom';
import Loader from '../../utilis/Loading';
import { useUpdateUser } from '../../../Graphql/Controller/UserCntroller';
import { useSelector } from 'react-redux';

const UpdateUser = () => {
  const params = useParams()
  const { data, loading, error, Update, } = useUpdateUser();
  // const { error:AllUserError, users, loading: AllUserLoading } = useSelector((state) => state.allUsers)

  const [name, setName] = useState(data?.UpdateUser.user.name);
  const [email, setEmail] = useState(data?.UpdateUser.user.name);
  const [role, setRole] = useState(data?.UpdateUser.user.name);
  const [message, setMessage] = useState(null)

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();
    Update(params.id, name, email, role)
  };

  useEffect(() => {
    if (data) {
      setMessage(data.UpdateUser.message)
    }
    if (error) {
      setMessage(error.message)
    }
  }, [data, error])

  return (
    <Fragment>
      {/* <MetaData tittle={"Create Product"} /> */}
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form encType='multipart/form-data' className="crateProductForm" onSubmit={updateUserSubmitHandler} style={{ width: "50%", height: "80%" }}>
            <div className="message">
              <h3 style={error ? ({ color: "tomato", fontWeight: "bold" }) : ({ color: "green", fontWeight: "bold" })}>{message}</h3>
            </div>
            <h1>Update User</h1>
            <div>
              <People />
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='User Name' />
            </div>
            <div>
              <Email />
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='User Email' />
            </div>
            <div>
              <VerifiedUser />
              <select name="category" value={role} onChange={(e) => setRole(e.target.value)}>
                <option>Set Role</option>
                <option value="root admin">Root Admin</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            <button type='submit' disabled={loading? true : false} style={{ cursor: "pointer" }}>{loading ? "Wait" : "Update"}</button>

          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default UpdateUser