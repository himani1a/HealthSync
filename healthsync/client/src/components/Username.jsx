
import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import avatar from '../assets/profile.png';
import style from "../style/Username.css?inline";
import backgroundImage from '../assets/back1.jpg'; 
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';  //to access data from user form
import { usernameValidate } from '../helper/validate';
import { useAuthStore } from '../store/store';  


  export default function Username() {
    
    const navigate = useNavigate();
   const setUsername = useAuthStore(state => state.setUsername);
    const formik = useFormik({
     initialValues: {
        username: 'example'
      },
      validate : usernameValidate,//to access data from user form
      validateOnBlur: false, //validate user input textbox only when clicked on submit button
      validateOnChange: false,
      onSubmit: async values => { //to access data from user form
        //console.log('form data', values)
        setUsername(values.username);
        navigate('/password')

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
          <div className="glass" >
          

            <div className="title d-flex flex-column align-items-center">
              {/* <h3 className='text-6xl font-weight-bold  mt-4'>Hello Again!</h3> */}
              <Link className="navbar-brand1 mt-4"><img decoding="async" src='../src/assets/mian.png' alt="Logo" /></Link>
              <span className='py-1 text-xl w-2/3 text-center text-secondary mt-1'>
                Explore More by connecting with us.
              </span>
            </div>

            <form className='py-4' onSubmit={formik.handleSubmit}>
              <div className='d-flex justify-content-center py-1'>
                <img src={avatar} className="profile" alt="avatar" />
              </div>

              <div className="text-center d-flex flex-column align-items-center justify-content-center mx-auto p-4 gap-3">
                <input {...formik.getFieldProps('username')} className=" form-control textbox" type="text" placeholder='Username' />
                <button className="btn col-12 col-md-6 col-lg-4" type='submit'>Lets Go</button>
              </div>

              <div className="text-center py-2">
                <span className='text-secondary'>Not a Member?<Link className='registertext' to="/Signup"><b> Register Now</b></Link></span>
              </div>
            </form>

          </div>
        </div>
      </div>
    );
  }
