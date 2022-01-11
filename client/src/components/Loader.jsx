import React from 'react'

export const Loader = () => {
  const myStyle ={
    color: "black",
    fontSize: "2rem",
    position: "absolute",
    top: "72%",
    left: "45%"
  }
    return (
      <div>
      <h3 style={myStyle}>Loading...</h3>
      </div>
    );
}
