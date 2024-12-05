import React, { Fragment, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Component/Header/Navbar'
import './App.scss'
import Home from './Component/Home/Home'
import Loader from './Component/utilis/Loading'
import ProtectedRoute from './Component/Route/ProtectedRoute'
import { useDispatch, useSelector } from 'react-redux'
import { useLoadUser } from './Graphql/Controller/UserCntroller'


const Training = React.lazy(() => import("./Component/Training/Training"));
const Dashboard = React.lazy(() => import("./Component/Dashboard/Dashboard"));
const LoginSignUp = React.lazy(() => import("./User/LoginSignup"));
const Editor = React.lazy(() => import("./Component/Editor/editor"));
const Test = React.lazy(() => import("./Component/test"));
const About = React.lazy(() => import("./Component/Home/About"));
const UserList = React.lazy(() => import("./Component/Dashboard/User/User"));
const UserProfile = React.lazy(() => import("./Component/Dashboard/User/UserProfile"));
const ForgotPassword = React.lazy(() => import("./User/ForgotPassword"));
const ResetPassword = React.lazy(() => import("./User/ResetPassword"));
const UpdateUser = React.lazy(() => import("./Component/Dashboard/User/UpdateUser"));

function App() {
  const dispatch = useDispatch()
  const {isAuthenticate, user} = useSelector((state) => state.LoginUser)
  const {LoadUser, data, loading, error} = useLoadUser()
  React.useEffect(()=>{
    LoadUser(dispatch)
  },[LoadUser])

  return (
    <Fragment>
      <Router>
        <Navbar />
        <Suspense fallback={<Loader/>}>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/test' element={<Test />} />
            <Route exact path='/training' element={<Training />} />
            <Route exact path='/login' element={<LoginSignUp />} />
            <Route exact path='/password/forgot' element={<ForgotPassword />} />
            <Route exact path='/password/forgot/:token' element={<ResetPassword />} />

            {/* Admin Route */}
            <Route exact path='/admin/dashboard' element={<ProtectedRoute Component={Dashboard} />} />
            <Route exact path='/admin/users' element={<ProtectedRoute Component={UserList}/>}/>
            <Route exact path='/admin/profile' element={<ProtectedRoute Component={UserProfile}/>}/>
            <Route exact path='/admin/users/:id' element={<ProtectedRoute Component={UpdateUser}/>}/>
          </Routes>
        </Suspense>
      </Router>
    </Fragment>
  )
}

export default App
