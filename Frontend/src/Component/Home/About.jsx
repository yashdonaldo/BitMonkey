import React from 'react'
import Sidebar from '../Header/Sidebar'
import Pagination from '../utilis/Pagination'

const About = () => {
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="dashboard-container">
                <div className="section">
                    <div id="page1">
                        <div className="firt-content">
                            <img src="https://avada.website/portfolio/wp-content/uploads/sites/187/2024/04/hemisferio-brand-identity.jpg" alt="image" srcset="" />
                            <h1>Machine Learning</h1>
                            <p>Machine learning is a subfield of artificial intelligence that involves the development of algorithms and statistical models that enable machines to learn from data, make decisions, and improve their performance over time. It's a type of artificial intelligence that allows machines to imitate intelligent human behavior. Machine learning is used in various applications such as natural language processing, computer vision, speech recognition, email filtering, agriculture, and medicine. The mathematical foundations of machine learning are provided by mathematical optimization methods.</p>
                        </div>
                    </div>
                    <div id="page2">
                        <div className="link">
                            <button>Go where</button>
                        </div>
                        <div className="discription">
                            <p>Our objective was to design a digital platform that not only connects diverse teams but also integrates various business processes, promoting a unified organizational culture.</p>
                        </div>
                    </div>
                    <div id="page3"></div>
                    <div id="page4"></div>
                <Pagination/>
                </div>

            </div>
        </div>
    )
}

export default About
