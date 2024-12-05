import axios from 'axios'
import { GetvideoAction, videoAction } from '../Reducer/ContentReducer'

// Upload Video
export const videoUpload = (content) => async (dispatch) => {
    try {
        dispatch(videoAction.Video_Request())
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };

        const signedUrl = await axios.post("/api/v1/video", content, config);
        console.log(signedUrl)

        dispatch(videoAction.Video_Success({ signedUrl }))
    } catch (error) {
        console.log(error)
        dispatch(videoAction.Video_fail({ error }))
    }
}


// Get Video
export const getVideo = () => async (dispatch) => {
    try {
        dispatch(GetvideoAction.Get_Video_Request());

        const dataValue = await axios.get("/api/v1/video")
        console.log(dataValue)
        dispatch(GetvideoAction.Get_Video_Success(dataValue.data))
    } catch (error) {
        console.log(error)
    }
}

// // List Object
// export const ListObject = () => async (dispatch) => {
//     try {
//         dispatch(listObjectAction.Get_List_Request())

//         const {data} = await axios.get("/api/v1/list")
//         console.log(data)

//         dispatch(listObjectAction.Get_List_Success(data))
//     } catch (error) {
//         console.log(error)
//         dispatch(listObjectAction.Get_List_Fail(error))
//     }
// }