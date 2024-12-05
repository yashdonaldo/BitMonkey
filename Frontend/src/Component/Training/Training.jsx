import React from 'react';
import './TrainingPage.scss';
import Sidebar from '../Header/Sidebar';
import { gsapTrigger } from './TrainingGsap';

function Training() {
  gsapTrigger()

  return (
    <div className='dashboard'>
      <Sidebar />
      <div className="dashboard-container">
        <div className="section">
          <div id="page1">
            <video loop muted autoPlay="autoplay">
              <source src="https://bitmonkey-s3.s3.ap-south-1.amazonaws.com/upload/video/video-1725366569877.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAZQ3DSCH5JLKV2IPE%2F20240905%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240905T052426Z&X-Amz-Expires=900&X-Amz-Signature=cfcad6d3bc47a664f984b8fa8218ace575fbc75e7ef47b2af981960b3776f682&X-Amz-SignedHeaders=host&x-id=GetObject" type='video/mp4' />
            </video>
          </div>
          <div id="page2">
            <h1>Learn AI ML WEB DEVELOPMENT</h1>
          </div>
          <div id="page3">
            <div id="para1">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates veritatis cum dolores ullam accusamus sed natus molestias maiores autem aperiam.</p>
            </div>
            <div id="para2">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam libero commodi itaque est explicabo quod. Asperiores reiciendis voluptates maiores ipsam.</p>
            </div>
            <div id="para2">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis inventore ipsum molestiae vero hic aperiam molestias accusantium ab sequi sapiente!</p>
            </div>
            <div id="para3">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis inventore ipsum molestiae vero hic aperiam molestias accusantium ab sequi sapiente!</p>
            </div>
            <div id="para3">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis inventore ipsum molestiae vero hic aperiam molestias accusantium ab sequi sapiente!</p>
            </div>
          </div>
          <div id="page4">
            <h1>yash</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Training;