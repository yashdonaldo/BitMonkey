import { createSlice } from '@reduxjs/toolkit'

// Video Reducer
const videoContent = createSlice({
    name: "video-content",
    initialState: {loading: false, video: {}, error: null},
    reducers: {
        Video_Request : (state, actions)=> {
            state.loading = true
        },
        Video_Success: (state, actions) => {
            state.loading = false,
            state.video = actions.payload
        },
        Video_fail: (state, actions) => {
            state.loading = false,
            state.error = actions.payload
        }
    }
})

// Get Video Reducer
const getVideo = createSlice({
    name: "getVideo",
    initialState: {loading: false, video: null, error: null},
    reducers: {
        Get_Video_Request: (state, actions)=>{
            state.loading = true
        },
        Get_Video_Success: (state, actions)=>{
            state.loading = false,
            state.video = actions.payload
        },
        Get_Video_Fail: (state, actions) => {
            state.loading = false,
            state.error = actions.payload
        }
    }
})

export const videoAction = videoContent.actions;
export const GetvideoAction = getVideo.actions;

export {videoContent, getVideo}