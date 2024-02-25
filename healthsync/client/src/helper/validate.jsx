import toast from 'react-hot-toast';
import { authenticate } from './helper';


/** validate login page username */
export async function usernameValidate(values){
    const errors = verifyusername({}, values);

    if(values.username){
        // check user exist or not
        const { status } = await authenticate(values.username);
        
        if(status !== 200){
            errors.exist = toast.error('User does not exist!')
        }
    }

    return errors;
}
/** validate password */
export async function passwordValidate(values){
    const errors = passwordVerify({}, values);

    return errors;
} 

/** validate signup form */
export async function signupValidation(values){
    const errors = verifyusername({}, values);
    passwordVerify(errors, values);
    verifyemail(errors, values);

    return errors;
}


/** validate profile page */
export async function profileValidation(values){
    const errors = verifyemail({}, values);
    return errors;
}

/** validate password */
function passwordVerify(errors = {}, values){
    const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
    if(!values.password){
        errors.password = toast.error("Password is Required.");
    } else if(values.password.includes(" ")){
        errors.password = toast.error("Wrong Password.");
    }else if(values.password.length < 4){
        errors.password = toast.error("Password must be more than 4 characters long");
    }else if(!specialChars.test(values.password)){
        errors.password = toast.error("Password must have a special character");
    }

    return errors;
}

/** validate reset password */
export async function resetPasswordValidation(values){
    const errors = passwordVerify({}, values);

    if(values.password !== values.confirmpassword){
        errors.exist = toast.error("Password do not match.");
    } 

    return errors;
}

/** validate email */
function verifyemail(error ={}, values){
    if(!values.email){
        error.email = toast.error("Email is required.");
    }
    else if(!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(values.email)){
        error.email = toast.error("Email is invalid.");
    }
    else if(values.email.includes(" ")){                
        error.email = toast.error("Email is invalid.");
    }
    else if(values.email.length > 50){
        error.email = toast.error("Email is invalid.");
    }
    else if(values.email.length < 5){
        error.email = toast.error("Email is invalid.");
    }
     return error;
}
  


// valdiate username
function verifyusername(error = {}, values){
    if(!values.username){
        error.username = toast.error('Username is required.')    ;
    }else if(values.username.length < 3){
        error.username = toast.error('Username must be atleast 3 characters long');
    }else if(values.username.length > 20){
        error.username = toast.error('Username must be less than 20 characters long');
    }else if(!/^[a-zA-Z0-9_]+$/.test(values.username)){
        error.username = toast.error('Username must contain only alphanumeric characters');
    }
    else if (values.username.includes(" ")) {
        error.username = toast.error('Username must not contain spaces');
    }
    return error;
}