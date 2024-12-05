import React, { Fragment, useEffect } from 'react'
import Sidebar from '../Header/Sidebar'
import './home.scss'
import { useDispatch, useSelector } from 'react-redux'
// import { getVideo, ListObject } from '../../Action/ContentAction'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import Loader from '../utilis/Loading'
import { getVideo } from '../../Action/ContentAction'


const Home = () => {
  const dispatch = useDispatch()
  const { loading,video, error } = useSelector((state) => state.getVideo)
  // const { listObj, loading:listLoading, error:listError } = useSelector((state) => state.listObject)

  gsap.registerPlugin(ScrollTrigger);

  const Video = document.querySelector("video")

  // Gsap
  useGSAP(() => {
    const tl = gsap.timeline()
    ScrollTrigger.create({
      trigger: Video,
      start: "top 0%",
      // end: "top -100%",
      scrub: 2,
      onScrub: (progress) => {
        Video.currentTime = progress * Video.duration
      },
      pin: true
    })

    tl.from(".page-1 .detail h1", ({
      y: -500,
      duration: 1.5,
    }))
    tl.from(".page-1 .detail p", ({
      y: 500,
      duration: 1,
    }))
  });

  useEffect(() => {
    dispatch(getVideo())
  }, [dispatch])
  return (
    <Fragment>
      {loading ? <Loader /> : <Fragment>
        <div className='Home'>
          <Sidebar />
          <div className="home-container">
            <div className="section">
              <div className="page-1" style={{ width: "100%", height: "100vh" }}>
                <img src="/image/home.jpeg" alt="" srcSet="" />
                <div className="detail">
                  <h1>Welcome To BitMonkey</h1>
                  <p>We Specialize in training, development and Consulting across Artificial Intelligence, Machine Learning, Api's, Microservices, Devops, Cloud Computing</p>
                </div>
              </div>

              <div className="page-2">
                {video &&  video.map((value) => (
                  <video loop muted autoPlay="autoplay" className='video' key={value.video.key}>
                    <source src={value.video.url}/>
                  </video>
                ))}
              </div>

            </div>
          </div>

        </div>
      </Fragment>}
    </Fragment>
  )
}

export default Home
