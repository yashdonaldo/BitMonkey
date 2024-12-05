import React, { Fragment, useEffect } from 'react'
import Dropdown from './Header/Dropdown'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { videoUpload } from '../Action/ContentAction'
import Loader from './utilis/Loading'

const Test = () => {
  const [video, setvideo] = useState()
  const [name, setName] = useState()
  const dispatch = useDispatch();
  const filename = `video-${Date.now()}.mp4`
  const loading = false
  // console.log(filename)

  const fileSubmit = (e) => {
    e.preventDefault();
    const MyForm = new FormData()
    MyForm.set("filename", name)
    MyForm.set("video", video)

    dispatch(videoUpload(MyForm))
  }

  const videoDataChange = (e) => {

    const fileInput = document.getElementById("file");
    const files = fileInput.files[0];
    console.log(filename)
    setvideo(files)
    setName(fileInput.name)
  }

  return (
    <Fragment>
      {loading ? <Loader /> : <Fragment>
        <div>
          <form onSubmit={fileSubmit}>
            <input type="file" name={`${filename}`} id="file" onChange={videoDataChange} accept='video/mp4' />
            <button type="submit">submit</button>
          </form>
        </div>
      </Fragment>}
    </Fragment>
  )
}

export default Test
