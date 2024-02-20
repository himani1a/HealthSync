
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import style from "../style/Username.css?inline";

import backgroundImage from '../assets/back1.jpg';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';  //to access data from user form
import { profileValidation } from '../helper/validate';
import imageToBase64 from '../helper/convert';

export default function Profile() {

  const [file, setFile] = useState();


  const formik = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      mobile: '',
      address: ''
    },
    validate: profileValidation,//to access data from user form
    validateOnBlur: false, //validate user input textbox only when clicked on submit button
    validateOnChange: false,
    onSubmit: async values => { //to access data from user form
      console.log(values)
      values = await Object.assign(values, { profile: file || '' });
    }
  })

  /*formik doesnt support file upload so we use this function to upload file*/
  const onUpload = async e => {
    const base64 = await imageToBase64(e.target.files[0]);
    setFile(base64);
  }
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    overflow: 'hidden'
  };


  return (


    <div className={`container-fuild ${style['background-container']}`} style={containerStyle}>

      <Toaster position='top-center' reverseOrder={false} toastOptions={{ style: { fontSize: '14px' } }} />
      <div className='row justify-content-center'>
        <div className='col-sm-12 offset-sm-2 col-lg-3 col-xl-4 offset-xl-1 text-center'>


          <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className="glass" style={{ height: "85%", marginRight: "4em", width: "50%" }}>


              <div className="title d-flex flex-column align-items-center">
                {/* <h3 className='text-6xl font-weight-bold  mt-4'>Hello Again!</h3> */}
                <Link className="navbar-brand1 mt-3"><img decoding="async" src='../src/assets/mian.png' alt="Logo" /></Link>
                <span className='py-1 text-xl w-2/3 text-center text-secondary mt-1'>
                  You can update the details here.
                </span>
              </div>

              <form className='py-4' onSubmit={formik.handleSubmit}>


                <label htmlFor='profile'>
                  <img src={file || avatar} className="profile" alt="avatar" />
                </label>
                <input onChange={onUpload} type='file' id='profile' name='profile' />


                <div className="text-center d-flex flex-column align-items-center justify-content-center mx-auto p-2 gap-3">
                  <input {...formik.getFieldProps('firstname')} className="textbox" type="password" placeholder='Full Name' />
                  <input {...formik.getFieldProps('mobile')} className="textbox" type="password" placeholder='Mobile Number' />
                  <input {...formik.getFieldProps('email')} className="textbox" type="password" placeholder='Email' />



                  <input {...formik.getFieldProps('address')} className="textbox" type="password" placeholder='Address' />

                  <button className="btn col-12 col-md-6 col-lg-4" type='submit'>Update</button>


                </div>

                <div className="text-center">
                  <span className='text-secondary'>Come back later?<Link className='registertext' to="/login"><b> Logout </b></Link></span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
