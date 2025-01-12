import mongoose from "mongoose"

const contentModel = new mongoose.Schema({
    tittle:{
        type:String,
        required:[true,"Please Enter the tittle"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please Enter the description"],
    },
    image:{
        type:String,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required : [true, "Couse Type Must Required"]
    },
    complited:{
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

export default mongoose.model("Content", contentModel)