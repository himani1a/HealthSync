
import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png';
import style from "../style/Username.css?inline";
import backgroundImage from '../assets/back1.jpg'; 
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';  //to access data from user form
import { signupValidation } from '../helper/validate';
import imageToBase64 from '../helper/convert';
import { registerUser } from '../helper/helper';

export default function Signup  () {

  const navigate = useNavigate()
  const [file, setFile] = useState()
 

    const formik = useFormik({
     initialValues: { 
      email:'',
      username: '',
      password:'',
      phonenumber:'',
      },
      validate : signupValidation,//to access data from user form
      validateOnBlur: false, //validate user input textbox only when clicked on submit button
      validateOnChange: false,
      onSubmit: async values => { //to access data from user form
        values = await Object.assign(values, {profile: file || ''});
        let registerPromise = registerUser(values)
        toast.promise(registerPromise, {
          loading: 'Creating...',
          success : <b>Registered Successfully!</b>,
          error : <b>Registered Successfully!</b>
        });
        registerPromise.then(function(){ navigate('/username')});
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

        <Toaster position='top-center' reverseOrder={false} toastOptions={{style: {fontSize: '14px'}}} />
        <div className='row justify-content-center'>
        <div className='col-sm-8 offset-sm-2 col-lg-6 offset-lg-1 col-xl-5 text-center'>

        
        <div className='d-flex justify-content-center align-items-center vh-100'>
        <div className="glass" style={{ height:"77%" , marginRight:"4em"}}>


            <div className="title d-flex flex-column align-items-center">
              {/* <h3 className='text-6xl font-weight-bold  mt-4'>Hello Again!</h3> */}
              <Link className="navbar-brand1 mt-3"><img decoding="async" src='../src/assets/mian.png' alt="Logo" /></Link>
              <span className='py-1 text-xl w-2/3 text-center text-secondary mt-1'>
               Hello! Glad to see you.
              </span>
            </div>

            <form className='py-4' onSubmit={formik.handleSubmit}>
              
              
                <label htmlFor='profile'>
                <img src={file || avatar} className="profile" alt="avatar" />
                </label>
                <input onChange={onUpload} type='file' id='profile' name='profile'/>
              

              <div className="text-center d-flex flex-column align-items-center justify-content-center mx-auto p-3 gap-2">
                <input {...formik.getFieldProps('email')} className="textbox" type="email" placeholder='Email*' />
                <input {...formik.getFieldProps('username')} className="textbox" type="name" placeholder='Username*' />
                <input {...formik.getFieldProps('password')} className="textbox" type="password" placeholder='Password*' />
                <input {...formik.getFieldProps('phonenumber')} className="textbox" type="phone" placeholder='Phonenumber*' />
                <button className="btn col-12 col-md-6 col-lg-4" type='submit'>Sign Up</button>
              </div>

              <div className="text-center ">
                <span className='text-secondary'>Already have a account?<Link className='registertext' to="/username"><b> Login Now</b></Link></span>
              </div>
            </form>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
