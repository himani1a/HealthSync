
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../assets/profile.png';
import style from "../style/Username.css?inline";

import backgroundImage from '../assets/back1.jpg'; 
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';  //to access data from user form
import { passwordValidate } from '../helper/validate';
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store';  
import { verifyPassword } from '../helper/helper';

  export default function Password() {
   
    const navigate = useNavigate()
    const {username} = useAuthStore(state => state.auth);
    const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`)


    const formik = useFormik({
     initialValues: {
        password:'admin@123'
      },
      validate : passwordValidate,//to access data from user form
      validateOnBlur: false, //validate user input textbox only when clicked on submit button
      validateOnChange: false,
      onSubmit: async values => { //to access data from user form
        let loginPromise = verifyPassword({ username, password : values.password })
        toast.promise(loginPromise, {
          loading: 'Checking...',
          success : <b>Login Successfully!</b>,
          error : <b>Password Not Match!</b>
        });
  
        loginPromise.then(res => {
          let { token } = res.data;
          localStorage.setItem('token', token);
          navigate('/profile')
        })
     }
    })      
    
     if(isLoading) return <h1>isLoading</h1>;
     if(serverError) return <h1>{serverError.message}</h1>




    const containerStyle = {
      backgroundImage: `url(${backgroundImage})`, 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };


    return (
     

      <div className={`container-fluid ${style['background-container']}`} style={containerStyle}>

        <Toaster position='top-center' reverseOrder={false} toastOptions={{style: {fontSize: '14px'}}} />

        <div className='d-flex justify-content-center align-items-center vh-100'>
          <div className="glass">

            <div className="title d-flex flex-column align-items-center">
              {/* <h3 className='text-6xl font-weight-bold  mt-4'>Hello Again!</h3> */}
              <Link className="navbar-brand1 mt-4"><img decoding="async" src='../src/assets/mian.png' alt="Logo" /></Link>
              <span className='py-1 text-xl w-2/3 text-center text-secondary mt-1'>
                Hello {apiData?.firstName ||apiData?.username},<br></br>Please enter your password to continue.
              </span>
            </div>

            <form className='py-4' onSubmit={formik.handleSubmit}>
              <div className='d-flex justify-content-center py-1'>
                <img src={apiData?.profile || avatar} className="profile" alt="avatar" />
              </div>

              <div className="text-center d-flex flex-column align-items-center justify-content-center mx-auto p-4 gap-3">
                <input {...formik.getFieldProps('password')} className="textbox" type="password" placeholder='Password' />
                <button className="btn col-12 col-md-6 col-lg-4" type='submit'>Sign Up</button>
              </div>

              <div className="text-center py-2">
                <span className='text-secondary'>Forgot Password?<Link className='registertext' to="/recovery"><b> Reset Now</b></Link></span>
              </div>
            </form>

          </div>
        </div>
      </div>
    );
  }
