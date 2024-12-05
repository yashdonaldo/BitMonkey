import React, { Fragment } from 'react'
import './Navbar.scss';
// import { FiShoppingCart, FiLogIn, FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <Fragment>
      <nav id='nav'>
        <div className="logo"><h3>Bit Monkey</h3></div>
        <div className="tabs">
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
              <Link to={"/training"}>Training</Link>
              <Link to={"/men"}>Men</Link>
              <Link to={"/women"}>Women</Link>
              <Link to={"/test"}>test</Link>
            </li>
          </ul>
        </div>
        <div className="account">
          <ul>
            <li>
              <Link to={"/search"}>Search</Link>
              <Link to={"/contact"}>Contact</Link>
              <Link to={"/cart"}>Cart </Link>
              <Link to={"/login"}>SignIn</Link>
            </li>
          </ul>
        </div>
        {/* <div className="profile" style={!isAuthenticated ? {display: "none"} : {display: "block"}}>
              {isAuthenticated &&  <UserOptions user={User}/>}
        </div> */}
      </nav>
    
    </Fragment>
  )
}

export default Navbar