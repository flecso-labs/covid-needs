import React, { useState,Component, useContext,useEffect } from 'react';
import {Link, Redirect} from "react-router-dom";
import TitleComponent from "../pages/title";
import {AuthContext} from '../firebase/Auth'
import Firebase from '../firebase/Firebase.js'
import logo from '../assets/images/flecso.png'

let app = Firebase;
function Header() {

   const [redirect, setRedirect] = useState(false);
   const [orgName, setOrgName] = useState("Satna Covid Tracker");

  const handleClickLogout = async event => {
       localStorage.removeItem('token');
       localStorage.setItem('isLoggedIn', false);
       localStorage.clear();
       await app.auth().signOut();
       setRedirect(true);
//   this.setState({ toDashboard: true });
  };

  useEffect(() => {
    // console.log("org name get " + localStorage.getItem('org_name'));

  })

    const renderRedirect = () => {
      if (redirect) {
        return <Redirect to='/login'/>
      }
    };

        return (
            <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
              <div class="container-fluid">
                <a class="navbar-brand" href="/dashboard">
{/* //                    <img style={{borderRadius: 50}} src={logo} alt="logo" width="42" height="42" class="d-inline-block align-top" /> */}
{/* //                      <TitleComponent title="Flecso Employer"></TitleComponent> */}
                      
                  </a>
                </div>
               
                <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                </form>
                <Link to={'/'} className="navbar-brand mr-1">  &nbsp;{orgName}</Link>
            
            </nav>
//           {renderRedirect()}
        );

}

export default Header
