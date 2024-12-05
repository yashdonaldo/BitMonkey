import React from 'react'

const SidebarSection = () => {
    const show = document.getElementById("show")
    const toggle = ()=>{
        if(show.style.display == "none"){
            show.style.display = "block"
        }else{
            show.style.display = "none"
            
        }
    }
  return (
    <div onClick={toggle}>
      <h2>Mearn</h2>
      <div className="subnav">
        <ul style={{display: "none"}}>
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
        </ul>
      </div>
    </div>
  )
}

export default SidebarSection
