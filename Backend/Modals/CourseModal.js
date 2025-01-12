import mongoose from 'mongoose';


const CourseSchema = new mongoose.Schema({
    tittle: {
        type: String,
        required: [true, "Please Enter the tittle"],
        trim: true
    },
    thumbnail: {
        type: String,
        required: [true, "Please Enter the thumbnail"],
    },
    category: {
        type: String,
        required: [true, "Please Enter the category"],
    },

    discription: {
        type: String,
        required: [true, "Please Enter discription"],
    },
    enroll: {type: Boolean, default: false},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please Enter the user"]
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

export default mongoose.model("Course", CourseSchema);