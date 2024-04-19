
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';

import Navbar1 from '../components/Navbar1'
import backgroundImage from '../assets/back1.jpg';
import useFetch from '../hooks/fetch.hook';
import toast,{ Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';  //to access data from user form
import { profileValidation } from '../helper/validate';
import imageToBase64 from '../helper/convert';
import { updateUser } from '../helper/helper';
import { useNavigate } from 'react-router-dom';



export default function Profile() {

  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch()
  const { navigate } = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName ||'' ,
      email: apiData?.email || '',
      phonenumber: apiData?.phonenumber|| '',
      address : apiData?.address || '',
      username : apiData?.username || '',
      
    },
    enableReinitialize: true,
    validate: profileValidation,//to access data from user form
    validateOnBlur: false, //validate user input textbox only when clicked on submit button
    validateOnChange: false,
    onSubmit: async values => { //to access data from user form
      console.log(values)
      values = await Object.assign(values, { profile: file ||apiData?.profile || '' });
      let updatePromise = updateUser(values);

      toast.promise(updatePromise, {
        loading: 'Updating...',
        success : <b>Update Successfully...!</b>,
        error: <b>Could not Update!</b>
      });
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

   // logout handler 
   {/*function userLogout(){
    localStorage.removeItem('token');
    navigate('/')
  }*/}
  if(isLoading) return <p>isLoading</p>;
  if(serverError) return <p>{serverError.message}</p>


  return (
    <div>
      <Navbar1 />
  


    <div className={`container-fuild`} style={containerStyle}>

      <Toaster position='top-center' reverseOrder={false} toastOptions={{ style: { fontSize: '14px' } }} />
      <div className='row justify-content-center '>
      <div className='col-sm-12 offset-sm-2 col-lg-3 col-xl-4 offset-xl-1 text-center' style={{marginTop: '-20px'}}> 


          <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className="glass" style={{ height: "90%", marginRight: "4em", width: "50%" }}>


              <div className="title d-flex flex-column align-items-center">
                {/* <h3 className='text-6xl font-weight-bold  mt-4'>Hello Again!</h3> */}
                <Link className="navbar-brand1 mt-3"><img decoding="async" src='../src/assets/mian.png' alt="Logo" /></Link>
                <span className='py-1 text-xl w-2/3 text-center text-secondary mt-1'>
                  You can update the details here.
                </span>
              </div>

              <form className='py-4' onSubmit={formik.handleSubmit}>


                <label htmlFor='profile'>
                  <img src={apiData?.profile || file || avatar} className="profile" alt="avatar" />
                </label>
                <input onChange={onUpload} type='file' id='profile' name='profile' />


                <div className="text-center d-flex flex-column align-items-center justify-content-center mx-auto p-2 gap-3">
                  <input {...formik.getFieldProps('firstName')} className="textbox" type="name" placeholder='Full Name' />
                  <input {...formik.getFieldProps('username')} className="textbox" type="name" placeholder='Username' />
                  <input {...formik.getFieldProps('phonenumber')} className="textbox" type="number" placeholder='Mobile Number' />
                  <input {...formik.getFieldProps('email')} className="textbox" type="email" placeholder='Email' />
              


                  <input {...formik.getFieldProps('address')} className="textbox" type="address" placeholder='Address' />

                  <button className="btn col-12 col-md-6 col-lg-4" type='submit'>Update</button>


                </div>

                {/* <div className="text-center">
                  <span className='text-secondary'>Come back later?<Link onClick={userLogout}className='registertext' to="/"><b> Logout </b></Link></span>
                </div>*/}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
