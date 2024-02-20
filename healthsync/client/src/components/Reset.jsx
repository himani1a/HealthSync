
import React from 'react';
import { Link } from 'react-router-dom';

import style from "../style/Username.css?inline";

import backgroundImage from '../assets/back1.jpg'; 
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';  //to access data from user form
import { resetPasswordValidation } from '../helper/validate';

  export default function Reset() {


    const formik = useFormik({
     initialValues: {
        password:'',
        confirmpassword: ''  
      },
      validate : resetPasswordValidation,//to access data from user form
      validateOnBlur: false, //validate user input textbox only when clicked on submit button
      validateOnChange: false,
      onSubmit: async values => { //to access data from user form
        console.log('form data', values)
      }
     })      
    const containerStyle = {
      backgroundImage: `url(${backgroundImage})`, 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };


    return (
     

      <div className={`container-fluid ${style['background-container']}`} style={containerStyle}>

        <Toaster position='top-center' reverseOrder={false} toastOptions={{style: {fontSize: '14px'}}} />

        <div className='d-flex justify-content-center align-items-center vh-100'>
          <div className="glass" style={{width : '20%'}}>

            <div className="title d-flex flex-column align-items-center">
              {/* <h3 className='text-6xl font-weight-bold  mt-4'>Hello Again!</h3> */}
              <Link className="navbar-brand1 mt-4"><img decoding="async" src='../src/assets/mian.png' alt="Logo" /></Link>
              <span className='py-1 text-xl w-2/3 text-center text-secondary mt-1'>
                Enter new password.
              </span>
            </div>

            <form className='py-4 pt-20' onSubmit={formik.handleSubmit}>
              {/* <div className='d-flex justify-content-center py-1'>
                <img src={avatar} className="profile" alt="avatar" />
              </div> */}

              <div className="text-center d-flex flex-column align-items-center justify-content-center mx-auto p-4 gap-3">
                <input {...formik.getFieldProps('password')} className="textbox" type="password" placeholder='New Password' />
                <input {...formik.getFieldProps('confirmpassword')} className="textbox" type="password" placeholder='Confirm New Password' />

                <button className="btn col-12 col-md-6 col-lg-4" type='submit'>Reset</button>
              </div>

              {/* <div className="text-center py-2">
                <span className='text-secondary'>Forgot Password?<Link className='registertext' to="/recovery"><b> Reset Now</b></Link></span>
              </div> */}
            </form>

          </div>
        </div>
      </div>
    );
  }
