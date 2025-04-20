import React from 'react'
import "./style.css"


interface MainTitleProps {
  title : string;
  id:string
}

const MainTitle = ({title, id} : MainTitleProps) => {

  return (
    <div className={`relative font-bold text-center leading-[50px] sm:leading-[70px] uppercase
      ${id === "main" ? "w-[220px] sm:w-[350px] xl:w-[483px] text-[22px] sm:text-[36px] xl:text-[50px]" 
        : id === "philosophy" ? "w-[220px] sm:w-[375px] xl:w-[480px] text-[18px] sm:text-[32px] xl:text-[40px]" 
        : "w-fit text-[21px] sm:text-[32px] xl:text-[40px]"}
      
      `}>

      <div className="absolute w-[80px] sm:w-[110px] h-[2px] [background-image:linear-gradient(223.64deg,#0D5252_4.07%,#0AABA9_98.01%)]
        left-[-28px] top-[-18px] sm:left-[-40px] sm:top-[-22px]
        animation-shadow
      ">
      </div>

      <div className="absolute h-[80px] sm:h-[110px] w-[2px] [background-image:linear-gradient(45deg,#0D5252_4.07%,#0AABA9_98.01%)]
        left-[-28px] top-[-18px] sm:left-[-40px] sm:top-[-22px]
        animation-shadow
      ">
      </div>
      
      {title && (<p>{title}</p>)}

      <div className="absolute w-[80px] sm:w-[110px] h-[2px] [background-image:linear-gradient(223.64deg,#0D5252_4.07%,#0AABA9_98.01%)]
        right-[-28px] bottom-[-18px] sm:right-[-40px] sm:bottom-[-22px]
        animation-shadow
      ">
      </div>

      <div className="absolute h-[80px] sm:h-[110px] w-[2px] [background-image:linear-gradient(45deg,#0D5252_4.07%,#0AABA9_98.01%)]
        right-[-28px] bottom-[-18px] sm:right-[-40px] sm:bottom-[-22px]
        animation-shadow
      ">
      </div>
    </div>
  )
}

export default MainTitle



// linear-gradient(223.64deg, #0D5252 4.07%, #0AABA9 46.81%, #0D5252 98.01%);

