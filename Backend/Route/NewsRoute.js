import express from 'express';
import { Newslist } from '../Controller/NewsController.js';
import {  uploadVideo, getVideo, deleteVideo } from '../Controller/awsController.js';
const router = express.Router();


// router.route("/me").post(Newslist)
router.route("/video").post(uploadVideo).get(getVideo)
router.route("/video/:id").delete(deleteVideo)
// router.route("/list").get(listObjectController)

export default router