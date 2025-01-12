import app from './app.js'
import { connectToDatabase, disconnectFromDatabase } from './config/database.js'
import userApp from "./UserService/user.service.js"
import dotenv from "dotenv"
import serverless from "serverless-http"

// Handling Uncaught Exception
process.on("uncaughtException", err=>{
    console.log(`Error: ${err.message}`)
    console.log("shutting down the server due to uncaught exception")
    process.exit(1)
})



dotenv.config({path: ".env"})

connectToDatabase()
// await connectRedis()

const Server = app.listen(process.env.PORT, ()=>{
    console.log(`Server Started at http://localhost:${process.env.PORT}`)

});

const UserServer = userApp.listen(process.env.USER_PORT, ()=>{
    console.log(`Server Started at http://localhost:${process.env.USER_PORT}`)
});

// Unhandled promise Rejection
process.on("unhandledRejection", err=>{
    console.log(`Error: ${err.message}`)
    console.log("shutting down server due to unhandled promise rejection")

    // Server.close(()=> {
    //     process.exit(1)
    // })
})

export const handler = serverless(app)
export const userService = serverless(userApp)