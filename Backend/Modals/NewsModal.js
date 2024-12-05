import mongoose from 'mongoose';


const NewsSchema = new mongoose.Schema({
    tittle : {
        type: String,
        required : [true, "Please Enter the tittle"],
        trim: true
    },
    discription: {
        type: String,
        required : [true, "Please Enter discription"],
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
});

export default mongoose.model("News", NewsSchema)