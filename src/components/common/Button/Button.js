import React from "react";
import  "./button.css";
function Button({ text, onClick, outlined }) {
  return (
    <div
      className={outlined ? 'outlinedBtnDiv' : 'btnDiv'}
      // onClick={() => onClick()}
    //   if outlined true outline btn css will apply elese btn div css style will aplly
    >
      {text}
    </div>
  );
}

export default Button;