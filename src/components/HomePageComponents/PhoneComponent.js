
import React from 'react'
import './landingpage.css'
import gradient from '../../images/gradient.png';
import iphone from '../../images/iphone.png';
// import gradient from '../../images/gradient.png';


import {motion} from 'framer-motion'



// use framer motion to move image infinty times
function Phonecomponent() {
  return (
    <div  className="phonebox">
        <img className="gradient"  style={{width:"250px",minWidth:"100px", height:"420px"}}src={gradient} alt="img" /> 
        {/* phone background image */}
        <motion.img  className="iphone" initial={{y:-10}} animate={{y:10}} transition={{type:"smooth", repeatType:"mirror",duration:2 ,repeat:Infinity}} 
          src={iphone} alt="img" />
      {/* phone img,mirror repeattype goes up and down */}
    </div>
  )
}

export default Phonecomponent