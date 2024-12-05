import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import ContentModel from "../Modals/ContentModel.js";
import catchAsyncError from "../utilis/catchAsyncError.js";
import {  S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'


// S3-client
const s3Client = new S3Client({
    region: process.env.BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY,
    }
});

// Upload Vieo
export const uploadVideo = catchAsyncError(async (req, res) => {
    const key = req.body.filename
    const Body = req.file.buffer
    const contentType = req.file.mimetype

    const command = new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: key,
        ContentType: contentType,
        Body: Body
    });

    await s3Client.send(command)

    const data = await ContentModel.create({video:{key}})

    res.status(200).json({success: true, data})
})

// Get Video
export const getVideo = catchAsyncError(async(req, res) => {
    const data = await ContentModel.find();

    for (const element of data) {
        // console.log(element)
        const command = new GetObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: element.video.key
        })  
        const url = await getSignedUrl(s3Client, command, {expiresIn: 3600})
        element.video.url = url
    }

    res.send(data)
})

// Delete Video
export const deleteVideo = catchAsyncError(async(req, res) => {
    const data = await ContentModel.findById(req.params.id)
    if(!data){
        return res.status(404).send("Content Not Found")
        
    }

    const command = new DeleteObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: data.video.key
    })
    await s3Client.send(command);

    await ContentModel.findByIdAndDelete(req.params.id)

    res.status(200).json({success: true, data})

})
