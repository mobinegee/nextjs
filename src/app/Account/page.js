'use client';

import './page.css';
// import Styles from './../page.module.css';
import Header from '../components/Header/Header';
import LoginForm from '../components/Loginform/Loginform';
import Register from '../components/Register/Register';
import { useState, useEffect } from 'react';
import Userinformation from '../components/UserAccount/UserAccount';

export default function Products() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 
  const [statuslogin, setStatusLogin] = useState(null); 
  const [userinfo , setuserinfo] = useState({})


  const handleClickLogin = () => {
    setStatusLogin(true);
  };
  const handleClickRegister = () => {
    setStatusLogin(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('authorization');
    if (token) {
      setIsAuthenticated(true);      
    } else {
      setIsAuthenticated(false);
    }
  }, []); 


  return (
    <div className='body'>
      <Header />
      {isAuthenticated === null ? (
        <div>Loading...</div> 
      ) : isAuthenticated ? (
        <Userinformation />
      ) : (
        <div className='forms'>
          {
            statuslogin ? (
              <>
                <div className='formslogin'>
                  <LoginForm />
                  <button className='buttonchangestatus' onClick={handleClickRegister}>ثبت نام</button>
                </div>
              </>
            ) : (
              <>
                <div className='registerform'>
                  <Register />
                  <button className='buttonchangestatuslogin'  onClick={handleClickLogin}>ورود</button>
                </div>
              </>
            )

          }
        </div>
      )}
    </div>
  );
}

