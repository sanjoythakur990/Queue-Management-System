const bcrypt= require('bcryptjs')
const userSchema = require("../schemas/userSchema")


const registerUser=({name, email, password})=>{
    return new Promise(async (resolve, reject)=>{
        const userExist = userSchema.findOne({email: email})
        if(!userExist) reject("Email already exists")

        const hashedPassword= await bcrypt.hash(password, Number(process.env.SALT))

        const userObj= new userSchema({name, email, password: hashedPassword})

        try {
            const userEntry= await userObj.save()
            resolve(userEntry)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports= {registerUser}