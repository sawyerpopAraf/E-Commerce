var express=require('express')
var router=express.Router()
const emailFormat=require('../middleware/email')
var jsend=require('jsend')
var bodyParser=require('body-parser')
var jsonParser=bodyParser.json()
var db=require('../models')
var UserService=require('../services/UserService')
var userService=new UserService(db)
var jwt=require('jsonwebtoken')
var crypto=require('crypto')

router.use(jsend.middleware)
require('dotenv').config();

router.post('/login', jsonParser, emailFormat, async (req, res, next) => {
    const { login, password } = req.body;

    if (!login) {
        return res.jsend.fail({ "message": "Email or username required" });
    }
    if (!password) {
        return res.jsend.fail({ "message": "Password required" });
    }

    try {
        const data = await userService.login(login);

        if (!data) {
            return res.jsend.fail({ result: "User or email not found" });
        }
        console.log(data)

        crypto.pbkdf2(password, data.salt, 310000, 32, "sha256", function (err, hashedPassword) {
            if (err) {
                return next(err);
            }
           
            console.log("Database Password Length:", data.encryptedPassword.length); 
            console.log("Haseded password Length:", hashedPassword.length);       

            if (!crypto.timingSafeEqual(data.encryptedPassword, hashedPassword)) {
                return res.jsend.fail({ result: "Incorrect password" });
            }
            
            let token;
            try {
                token = jwt.sign(
                    {
                        id: data.id,
                        email: data.email,
                        username: data.userName,
                        role:data.role
                        },
                    process.env.TOKEN_SECRET, 
                    { expiresIn: "2h" }
                );
            } catch (err) {
                return res.jsend.error("Something went wrong with creating JWT token");
            }

            res.jsend.success({
                result: "You are successfully logged in",
                id: data.id,
                email: data.email,
                username: data.userName,
                token: token,
                role:data.role
            });
        });
    } catch (error) {
        next(error);
    }
});

router.post("/signup",jsonParser,emailFormat, async (req, res, next) => {
	const { firstname, lastname, username,email,password,address,tlfnumber } = req.body;
	if (firstname == null&&lastname==null ) {
	  return res.jsend.fail({ name: "Name is required." });
	}
	if (email == null) {
	  return res.jsend.fail({ email: "Email is required." });
	}
	if (password == null) {
	  return res.jsend.fail({ password: "Password is required." });
	}
    if(username==null){
        return res.jsend.fail({ password: "Username is required." });
    }
    if(address==null){
        return res.jsend.fail({ password: "Address is required." });
    }
    if(tlfnumber==null){
        return res.jsend.fail({ password: "Telephone number is required." });
    }
	
	 try {
        const existingEmail = await userService.findUserByEmail(email);
        if (existingEmail) {
            return res.jsend.fail({ email: "Provided email is already in use." });
        }

        const existingUsername = await userService.findUserByUsername(username);
        if (existingUsername) {
            return res.jsend.fail({ username: "Username already in use" });
        }

        var salt = crypto.randomBytes(16);
        crypto.pbkdf2(password, salt, 310000, 32, "sha256", async function (err, hashedPassword) {
            if (err) {
                return res.jsend.error("Error in password processing");
            }
            await userService.createUser(firstname, lastname, username, email, hashedPassword, salt, address, tlfnumber);
            res.jsend.success({ result: "You created an account." });
        });
    } catch (error) {
        next(error);
    }
  });

module.exports=router