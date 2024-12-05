import JWT from "jsonwebtoken"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import crypto from "crypto"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: [true, "Email already registerd"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false
    },
    role: {
        type: String,
        default: "user"
    },
    ResetToken: String,
    ResetTokenExpired: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})


// Compare Password
UserSchema.methods.comparePassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password)

}

// Jwt Token
UserSchema.methods.getJWTToken = function () {
    return JWT.sign({ id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE })
}

// Genarating Register User Token
UserSchema.methods.getResetToken = function () {
    // Genarating Token
    const ResetToken = crypto.randomBytes(20).toString("hex")

    // Hashing and adding registerToken to schema
    this.ResetToken = crypto.createHash("sha256").update(ResetToken).digest("hex");
    this.ResetTokenExpired = Date.now() + 15*60*1000;

    return ResetToken

}


export default mongoose.model("User", UserSchema)