
import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import style from "../style/Username.css?inline";
import {useAuthStore} from '../store/store';
import backgroundImage from '../assets/back1.jpg'; 
import toast,{ Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';  //to access data from user form
import { useEffect } from 'react';
import { passwordValidate } from '../helper/validate';
import { generateOTP } from '../helper/helper';
import { verifyOTP } from '../helper/helper';


export default function Password() {
    
    const { username } = useAuthStore(state => state.auth);
    const [OTP, setOTP] = useState();
    const navigate = useNavigate()

    useEffect(() => {
      let isMounted = true;
    
      generateOTP(username).then((OTP) => {
        if (isMounted) {
          console.log(OTP)
          if (OTP) return toast.success('OTP has been sent to your email!');
          return toast.error('Problem while generating OTP!')
        }
      });
    
      return () => {
        isMounted = false;
      };
    }, [username]);
    

    async function onSubmit(e){
      e.preventDefault();
      try {
        let { status } = await verifyOTP({ username, code : OTP })
        if(status === 201){
          toast.success('Verify Successfully!')
          return navigate('/reset')
        }  
      } catch (error) {
        return toast.error('Wrong OTP! Check email again!')
      }
    }
  
    // handler of resend OTP
    function resendOTP(){
  
      let sentPromise = generateOTP(username);
  
      toast.promise(sentPromise ,
        {
          loading: 'Sending...',
          success: <b>OTP has been send to your email!</b>,
          error: <b>Could not Send it!</b>,
        }
      );
  
      sentPromise.then((OTP) => {
        console.log(OTP)
      });
      
    }
  
    // const formik = useFormik({
    //  initialValues: {
    //     password:''
    //   },
    //   validate : passwordValidate,//to access data from user form
    //   validateOnBlur: false, //validate user input textbox only when clicked on submit button
    //   validateOnChange: false,
    //   onSubmit: async values => { //to access data from user form
    //     console.log('form data', values)
    //   }
    //  })      
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
              Enter OTP to recover password.              </span>
            </div>

            <form className='pt-20 py-2' onSubmit={onSubmit}>
              {/* <div className='d-flex justify-content-center py-1'>
                <img src={avatar} className="profile" alt="avatar" />
              </div> */}

              < div className="text-center d-flex flex-column align-items-center justify-content-center mx-auto p-4 gap-4 ">
            
              <span className='py-4 text-sm text-secondary'>
                      Enter 6 digit OTP sent to your email address.
              </span>
                <input onChange={(e) => setOTP(e.target.value) } className="textbox" type="password" placeholder='OTP' />
                
                <button className="btn col-12 col-md-6 col-lg-4" type='submit'>Recover</button>
              </div>
              

             
            </form>
            <div className="text-center py-2">
                <span className='text-secondary'>Can't get OTP? <button onClick={resendOTP} className='registertext'><b>Resend OTP</b></button></span>
              </div>
          </div>
        </div>
      </div>
    );
  }
