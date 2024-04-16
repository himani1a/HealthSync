import React, { useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast, Toaster } from 'react-hot-toast';

import style from "../style/Username.css?inline";
import backgroundImage from '../assets/back1.jpg';
import { resetPasswordValidation } from '../helper/validate';
import { resetPassword } from '../helper/helper';
import { useAuthStore } from '../store/store';
import useFetch from '../hooks/fetch.hook';

export default function Reset() {
  const navigate = useNavigate();
  const { username } = useAuthStore(state => state.auth);
  const [{ isLoading, apiData, status, serverError }] = useFetch('createResetSession');

  useEffect(() => {
    console.log(apiData);
  }, [apiData]);

  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_pwd: ''
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      console.log('Form values at submission:', values);
      if (values.password.trim() !== values.confirm_pwd.trim()) {
        console.error('Passwords do not match');
        toast.error('Passwords do not match');
        return;
      }

      try {
        const resetPromise = resetPassword({ username, password: values.password });
        await toast.promise(resetPromise, {
          loading: 'Updating...',
          success: <b>Reset Successfully!</b>,
          error: <b>Could not Reset!</b>
        });
        navigate('/password'); // Navigate after promise resolves
      } catch (error) {
        console.error('Reset error:', error);
        toast.error('Reset failed');
      }
    }
  });

  if (isLoading) return <h1 className='text-2xl font-bold'>Loading...</h1>;
  if (serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>;
  if (status && status !== 201) return <Navigate to="/password" replace={true} />;

  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className={`container-fluid ${style['background-container']}`} style={containerStyle}>
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { fontSize: '14px' } }} />
      <div className='d-flex justify-content-center align-items-center vh-100'>
        <div className="glass" style={{ width: '20%' }}>
          <div className="title d-flex flex-column align-items-center">
            <Link className="navbar-brand1 mt-4"><img decoding="async" src='../src/assets/mian.png' alt="Logo" /></Link>
            <span className='py-1 text-xl w-2/3 text-center text-secondary mt-1'>Enter new password.</span>
          </div>
          <form onSubmit={formik.handleSubmit} className='py-4 pt-20'>
            <div className="text-center d-flex flex-column align-items-center justify-content-center mx-auto p-4 gap-3">
              <input {...formik.getFieldProps('password')} className="textbox" type="password" placeholder='New Password' />
              <input {...formik.getFieldProps('confirm_pwd')} className="textbox" type="password" placeholder='Confirm New Password' />
              {formik.errors.password && <div style={{ color: 'red' }}>{formik.errors.password}</div>}
              {formik.errors.confirm_pwd && <div style={{ color: 'red' }}>{formik.errors.confirm_pwd}</div>}
              <button className="btn col-12 col-md-6 col-lg-4" type='submit'>Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
