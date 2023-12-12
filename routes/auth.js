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

router.get('/login', function(req, res, next) {
      // #swagger.tags = ['Auth']
     // #swagger.description = "login page"
     // #swagger.produces = ['text/html']
      // #swagger.responses = [200]
    res.render('index');
  });

router.post('/login', jsonParser, emailFormat, async (req, res, next) => {
    // #swagger.tags = ['Auth']
    // #swagger.description = "Login route, only 'login' and 'password' are needed in the request body."
    // #swagger.responses[200] = { description: "Successful login" }

    const { login, password } = req.body;

    if (!login) {
        return res.jsend.fail({ "message": "Email or username required" });
    }
    if (!password) {
        return res.jsend.fail({ "message": "Password required" });
    }

    try {
        const user = await userService.login(login);

        if (!user) {
            return res.jsend.fail({ result: "User or email not found" });
        }

        crypto.pbkdf2(password, user.salt, 310000, 32, "sha256", function (err, hashedPassword) {
            if (err) {
                return next(err);
            }
           
           if (!crypto.timingSafeEqual(user.encryptedPassword, hashedPassword)) {
                return res.jsend.fail({ result: "Incorrect password" });
            }
            
            let token;
            try {
                token = jwt.sign(
                    {
                        id: user.id,
                        email: user.email,
                        username: user.userName,
                        role:user.role
                        },
                    process.env.TOKEN_SECRET, 
                    { expiresIn: "2h" }
                );
            } catch (err) {
                return res.jsend.error("Something went wrong with creating JWT token");
            }

            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 7200000 
              });

            res.jsend.success({
                     id: user.id,
                     email: user.email,
                     username: user.userName,
                     token: token,
                     role: user.role
        });

           
        });
    } catch (error) {
        next(error);
    }
});

router.post("/signup",jsonParser,emailFormat, async (req, res, next) => {
        // #swagger.tags = ['Auth']
        // #swagger.description = "sign up" 
        // #swagger.responses = [200]
    
	const { firstname, lastname, username,email,password,address,tlfnumber } = req.body;
	if (firstname == null&&lastname==null ) {
	  return res.jsend.fail({ name: "Name is required." });
	}
	if (!email) {
	  return res.jsend.fail({ email: "Email is required." });
	}
	if (!password) {
	  return res.jsend.fail({ password: "Password is required." });
	}
    if(!username){
        return res.jsend.fail({ username: "Username is required." });
    }
    if(!address){
        return res.jsend.fail({ address: "Address is required." });
    }
    if(!tlfnumber){
        return res.jsend.fail({ tlfnumber: "Telephone number is required." });
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

router.post('/logout',(req,res)=>{
        // #swagger.tags = ['Auth']
        // #swagger.description = "logout routes, it will delete the JWT cookie" 
        // #swagger.responses = [200]
    res.cookie('token','',{maxAge:0})
    res.jsend.success({message:"logged out"})
})

module.exports=router