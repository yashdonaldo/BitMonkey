import mongoose from "mongoose"

const contentModel = new mongoose.Schema({
    video: {
        key : {
            type: String,
            required: [true, "Key not Found"]
        },
        url: {
            type: String,
        }
        
    }
});

export default mongoose.model("Content", contentModel)