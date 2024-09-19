const express= require('express')
const app= express()
require('dotenv').config()
const PORT= process.env.PORT
const session= require('express-session')
const mongodbSession= require('connect-mongodb-session')(session)
const store= new mongodbSession({
    uri: process.env.MONGO_URI,
    collection: "sessions"
})

const dbConnect= require('./dbConnection')
const authRouter = require('./routers/authRouter')

app.use(session({
    secret: process.env.SECRET_KEY,
    store: store,
    resave: false, 
    saveUninitialized: false
}))
app.use(express.json())  // body parser
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/auth", authRouter)

app.get("/yo", (req, res)=>{
    return res.send("api working")
})

app.listen(PORT, ()=>{
    console.log("Server is running on PORT: "+ PORT);
});