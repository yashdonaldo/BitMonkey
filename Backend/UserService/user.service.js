import express  from "express"
const userApp = express()
import errorMiddleWare  from "../utilis/error.js"
import cookieParser  from "cookie-parser"

userApp.use(express.json())
userApp.use(cookieParser())
userApp.use(express.urlencoded({extended: true, parameterLimit: true}))

userApp.get("/", (req, res)=>{
    res.send("hello From User Server")
})

// Route Handle
import UserRoute from "../Route/UserRoute.js"

userApp.use("/api2/v1/user", UserRoute )

// Middleware Error Handle
userApp.use(errorMiddleWare)

export default userApp