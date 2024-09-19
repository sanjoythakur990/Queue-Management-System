const bcrypt= require('bcryptjs')
const { registerUser } = require("../models/userModel")
const userSchema = require("../schemas/userSchema")
const userDataValidation = require("../utils/authUtils")

const registerController=async (req, res)=>{
    const {name, email, password}= req.body
    console.log(req.session);
    // validation
    try {
        await userDataValidation(req.body)
    } catch (error) {
        return res.send({
            status: 400,
            message: "Data invalid",
            error: error
        })
    }

    try {
        const savedUser= await registerUser(req.body)
        return res.send({
            status: 201,
            message: "User registered successfully",
            data: savedUser
        })
    } catch (error) {
        return res.send({
            status: 500,
            message: "Internal server error",
            error: error
        })
    }
}


const loginController= async (req, res)=>{
    const {email, password} = req.body
    if(!email || !password) return res.send({status: 400, message: "Missing user credentials"})
    
    try {
        // find the user
        const userData= await userSchema.findOne({email: email})
        if(!userData) return res.send({status: 500, message: "Internal server error", error: "User not found"})
        // compare the password
        const isMatch= await bcrypt.compare(password, userData.password)
        if(!isMatch) return res.send({status: 400, message: "Incorrect password"})
        // session based auth
        req.session.isAuth= true
        req.session.user= {
            email: userData.email,
            userId: userData._id
        }
        return res.send({
            status: 200,
            message: "Login successfull"
        })

    } catch (error) {
        console.log(error);
        return res.send({
            status: 500,
            message: "Internal server error",
            error: error
        })
    }
    
    
}


const logoutController= (req, res)=>{
    req.session.destroy((err)=>{
        if(err) return res.send({status: 500, message: "Logout unsuccessfull"})

        return res.send({status: 200, message: "Logout successfull"})
    })
}


module.exports= {registerController, loginController, logoutController}