import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
axios.defaults.baseURL = 'http://localhost:8000'



/** Make API Requests */

/** To get username from Token */
export async function getUsername(){
    const token = localStorage.getItem('token')
    if(!token) return Promise.reject("Cannot find Token");
    let decode = jwtDecode(token)
    return decode;
}

/** authenticate function */
export async function authenticate(username){
    try {
        return await axios.post('/api/authenticate', { username })
    } catch (error) {
        return { error : "Username doesn't exist!"}
    }
}

/** get User details */
export async function getUser({ username }){
    try {
        const { data } = await axios.get(`/api/user/${username}`);
        return { data };
    } catch (error) {
        return { error : "Password doesn't Match!"}
    }
}

/** register user function */
export async function registerUser(credentials){
    try {
        console.log("Registering user with credentials:", credentials);

        const { data : { msg }, status } = await axios.post(`/api/signup`, credentials);

        let { username, email, password, profile } = credentials;

        /** send email */
        if(status === 201){
            await axios.post('/api/registerMail', { username, userEmail : email, text : msg, password, profile})
        }

        return Promise.resolve(msg)
    } catch (error) {
        console.error("Error during user registration:", error);
        return Promise.reject({ error })
    }
}

/** login function */
export async function verifyPassword({ username, password }){
    try {
        if(username){
            const { data } = await axios.post('/api/login', { username, password })
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "Password doesn't Match...!"})
    }
}

/** update user profile function */
export async function updateUser(response){
    try {
        
        const token = await localStorage.getItem('token');
        const data = await axios.put('/api/updateuser', response, { headers : { "Authorization" : `Bearer ${token}`}});

        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error : "Couldn't Update Profile...!"})
    }
}

/** generate OTP */
export async function generateOTP(username) {
    try {
      const response = await axios.get('/api/generateOTP', { params: { username } });
      const { code, email } = response.data;
      const { status } = response;
  
      // send mail with the OTP
      if (status === 201) {
        if (email) {
          let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
          await axios.post('/api/registerMail', { username, userEmail: email, text, subject: "Password Recovery OTP" });
        } else {
          // Handle the case where email is not available
        }
      }
  
      return Promise.resolve(code);
    } catch (error) {
      return Promise.reject({ error });
    }
  }
  

/** verify OTP */
export async function verifyOTP({ username, code }){
    try {
       const { data, status } = await axios.get('/api/verifyOTP', { params : { username, code }})
       return { data, status }
    } catch (error) {
        return Promise.reject(error);
    }
}

/** reset password */
export async function resetPassword({ username, password }){
    try {
        const { data, status } = await axios.put('/api/resetPassword', { username, password });
        return Promise.resolve({ data, status})
    } catch (error) {
        return Promise.reject({ error })
    }
}