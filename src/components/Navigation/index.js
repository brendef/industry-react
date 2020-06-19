import React from 'react'
import { Link } from 'react-router-dom'
import SignOutButton from '../SignOut'

import * as ROUTES from '../../constants/routes'
import { AuthUserContext } from '../Session'
 
import './navigation.css'


const Navigation = ({ authUser }) => (

  <AuthUserContext.Consumer>
    { authUser => authUser ? <NavigationAuth /> : <NavigationNonAuth /> }
  </AuthUserContext.Consumer>
  
)

const NavigationNonAuth = () => (
  <nav className="navbar navbar-expand-lg navbar-light">
  <Link className="navbar-brand pl-5 font-weight-bold" to={ROUTES.LANDING}> {"<"} Industry {"/>"}</Link>

  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
    
  <div className="line"></div>
  <div className="line"></div>
  <div className="line"></div>

  </button>

    <div id="navbarToggler" className="collapse navbar-collapse">
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link className="nav-link pl-5 pr-5 active" to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link pl-5 pr-5 active" to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
      </ul>
    </div>
  </nav>
)

const NavigationAuth = () => (
  <nav className="navbar navbar-expand-lg navbar-light">
  <Link className="navbar-brand pl-5 font-weight-bold" to={ROUTES.LANDING}> {"<"} Industry {"/>"}</Link>
  
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
    <div className="line"></div>
    <div className="line"></div>
    <div className="line"></div>
  </button>

    <div id="navbarToggler" className="collapse navbar-collapse">
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
      <li className="nav-item">
          <Link className="nav-link pl-5 pr-5 active" to={ROUTES.HOME}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link pl-5 pr-5 active" to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        <form className="form-inline">
          <li className="nav-item">
            <SignOutButton />
          </li>  
        </form>
      </ul>
    </div>
  </nav>
)
 
export default Navigation


// const Navigation = ({ authUser }) => (

//   <AuthUserContext.Consumer>
//     { authUser => authUser ? <NavigationAuth /> : <NavigationNonAuth /> }
//   </AuthUserContext.Consumer>
  
// )

// const NavigationAuth = () => (
//   <nav>

//     <div className="nav-left">
//       <h3 className="nav-logo"> <Link to={ROUTES.LANDING}> {"<"} Industry {"/>"}</Link></h3>
//     </div>
    
//     <div className="nav-right">
//       <input type="checkbox" id="open-nav"></input>
//       <label htmlFor="open-nav">
//         <div className="line"></div>
//         <div className="line"></div>
//         <div className="line"></div>
//       </label>

//       <ul className="nav-links">
//         <li>
//           <SignOutButton />
//         </li>  
//         <li>
//           <Link to={ROUTES.ACCOUNT}>Account</Link>
//         </li>
//         <li>
//           <Link to={ROUTES.HOME}>Home</Link>
//         </li>
//       </ul>
//     </div>
//   </nav>

// )
 
// const NavigationNonAuth = () => (
//   <nav>

//     <div className="nav-left">
//       <h3 className="nav-logo"> <Link to={ROUTES.LANDING}> {"<"} Industry {"/>"}</Link></h3>
//     </div>
    
//     <div className="nav-right">
//       <ul className="nav-links">
//         <li>
//           <Link to={ROUTES.LANDING}>Landing</Link>
//         </li>
//         <li>
//           <Link to={ROUTES.SIGN_IN}>Sign In</Link>
//         </li>
//       </ul>
//     </div>
//   </nav>
// )
 
// export default Navigation