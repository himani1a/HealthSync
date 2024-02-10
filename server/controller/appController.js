import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../config.js";
import { Await } from "react-router-dom";


/** POST:
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/

/** middleware verify user */
export async function verifyUser(req, res, next){
    try {
        
        const { username } = req.method == "GET" ? req.query : req.body;

        // check the user existance
        let exist = await UserModel.findOne({ username });
        if(!exist) return res.status(404).send({ error : "Can't find the User!"});
        next();

    } catch (error) {
        return res.status(404).send({ error: "Authentication Error"});
    }
}

/** POST: http://localhost:8080/api/signup
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/
// export async function signup(req, res) {

//     try {
//         const { username, password, profile, email } = req.body;

//         // check the existing user
//         const existUsername =  new Promise((resolve, reject) => {
//             UserModel.findOne({ username }, function (err, user) {
//                 if (err) reject(new Error(err))
//                 if (user) reject({ error: "Please use unique username" });

//                 resolve();
//             })
//         });

//         // check for existing email
//         const existEmail = new Promise((resolve, reject) => {
//             UserModel.findOne({ email }, function (err, email) {
//                 if (err) reject(new Error(err))
//                 if (email) reject({ error: "Please use unique Email" });

//                 resolve();
//             })
//         });


//         Promise.all([existUsername, existEmail])
//             .then(() => {
//                 if (password) {
//                     bcrypt.hash(password, 10)
//                         .then(hashedPassword => {

//                             const user = new UserModel({
//                                 username,
//                                 password: hashedPassword,
//                                 profile: profile || '',
//                                 email
//                             });

//                             // return save result as a response
//                             user.save()
//                                 .then(result => res.status(201).send({ msg: "User Register Successfully" }))
//                                 .catch(error => res.status(500).send({ error}))

//                         }).catch(error => {
//                             return res.status(500).send({
//                                 error: "Enable to hashed password"
//                             })
//                         })
//                 }
//             }).catch(error => {
//                 return res.status(500).send({ error })
//             })


//     } catch (error) {
//         return res.status(500).send(error);
//     }

// }


export async function signup(req, res) {
    try {
        const { username, password, profile, email } = req.body;

        // Check for existing user by username
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(400).send({ error: "Please use a unique username." });
        }

        // Check for existing user by email
        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).send({ error: "Please use a unique email." });
        }

        // Proceed with password hashing and user creation if no conflicts
        if (password) {
            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = new UserModel({
                    username,
                    password: hashedPassword,
                    profile: profile || '',
                    email
                });

                // Save the user and return success response
                await user.save();
                return res.status(201).send({ msg: "User registered successfully." });
            } catch (error) {
                // Error in password hashing
                return res.status(500).send({ error: "Unable to hash password." });
            }
        } else {
            // Password not provided
            return res.status(400).send({ error: "Password is required." });
        }
    } catch (error) {
        // Catch any other unexpected errors
        return res.status(500).send({ error: error.message || "An unexpected error occurred." });
    }
}


/** POST: http://localhost:8000/api/login
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
export async function login(req, res) {

    const { username, password } = req.body;

    try {

        UserModel.findOne({ username })
            .then(user => {
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {
                    

                        if (!passwordCheck) return res.status(400).send({ error: "Don't have a Password" });

                        // create jwt token
                        const token = jwt.sign({
                            userId: user._id,
                            username: user.username
                        }, ENV.JWT_SECRET, { expiresIn: "24h" });

                        return res.status(200).send({
                            msg: "Login Successful!",
                            username: user.username,
                            token
                        });

                    })
                    .catch(error => {
                        return res.status(400).send({ error: "Password does not Match" })
                    })
            })
            .catch(error => {
                return res.status(404).send({ error: "Username not Found" });
            })

    } catch (error) {
        return res.status(500).send({ error });
    }
}



/** GET: http://localhost:8000/api/user/example123 */
export async function getUser(req, res) {
    const { username } = req.params;

    if (!username) {
        return res.status(501).send({ error: "Invalid Username" });
    }

    try {
        const user = await UserModel.findOne({ username }).exec();

        if (!user) {
            return res.status(501).send({ error: "Couldn't Find the User" });
        }

        const { password, ...rest } = user.toJSON();
        return res.status(201).send(rest);
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(404).send({ error: "Cannot Find User Data" });
    }
}

// export async function getUser(req,res){
    
//     const { username } = req.params;

//     try {
        
//         if(!username) return res.status(501).send({ error: "Invalid Username"});

//         UserModel.findOne({ username }, function(err, user){
//             if(err) return res.status(500).send({ err });
//             if(!user) return res.status(501).send({ error : "Couldn't Find the User"});

//             /** remove password from user */
//             // mongoose return unnecessary data with object so convert it into json
//             const { password, ...rest } = Object.assign({}, user.toJSON());

//             return res.status(201).send(rest);
//         })

//     } catch (error) {
//         return res.status(404).send({ error : "Cannot Find User Data"});
//     }

// }
/** PUT: http://localhost:8000/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
export async function updateUser(req, res) {
    // It's a good practice to validate `req.user` before destructuring it
    if (!req.user || !req.user.userId) {
        console.error('Authentication failed: req.user is not set');
        return res.status(401).send({ error: "Unauthorized: No user credentials provided." });
    }

    const { userId } = req.user;
    const body = req.body;

    UserModel.updateOne({ _id: userId }, body, function(err, data) {
        if (err) {
            console.error('Database error:', err.message);
            return res.status(500).send({ error: "Database error occurred while updating the record." });
        }

        if(data.nModified === 0) {
            return res.status(404).send({ error: "No records updated. User may not exist." });
        }

        return res.status(201).send({ msg: "Record Updated!" });
    });
}


// export async function updateUser(req,res){
//     try {
        
//         // const id = req.query.id;
//         const { userId } = req.user;

//         if(userId){
//             const body = req.body;

//             // update the data
//             UserModel.updateOne({ _id : userId }, body, function(err, data){
//                 if(err) throw err;

//                 return res.status(201).send({ msg : "Record Updated!"});
//             })

//         }else{
//             return res.status(401).send({ error : "User Not Found!"});
//         }

//     } catch (error) {
//         return res.status(401).send({ error });
//     }
// }



/** GET: http://localhost:8000/api/generateOTP */
export async function generateOTP(req, res) {
    res.json("generateOTP route");
}

/** GET: http://localhost:8000/api/verifyOTP */
export async function verifyOTP(req, res) {
    res.json("verifyOTP route");
}

// successfully redirect user when OTP is valid
/** GET: http://localhost:8000/api/createResetSession */
export async function createResetSession(req, res) {
    res.json("createResetSession route");
}

// update the password when we have valid session
/** PUT: http://localhost:8000/api/resetPassword */
export async function resetPassword(req, res) {
    res.json("resetPassword route");
}
