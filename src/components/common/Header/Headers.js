import React, { useState } from 'react'
import './header.css'
import {Link} from 'react-router-dom'





function Header() {

  return (
   
    <div className="navbar">
    
      {/* nav bar  home,comapre, whishlist ,dashbord(right side) */}
        <h1 className="heading" style={{color:"var(--green) "}}>
        <Link to="/">
          CryptoTracker<span style={{color: "var(--blue)" }}>.</span>
        </Link>
      </h1>
   
      <div className="links">
        {/* switch buttn mui api */}
      
          
        
        {/* switch end */}
   
        
        
        
       </div>

       {/* nav bar end */}
      
       {/* sidebar for phone component */}
    </div>
  )
}

export default Header