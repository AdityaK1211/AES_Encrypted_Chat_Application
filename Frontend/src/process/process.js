import React, { useState, useEffect, useRef } from "react";
import Lottie from "react-lottie";
import animationData from "../loading.json";
import { useSelector } from "react-redux";
import "./process.scss";
function Process() {
  const [play, setPlay] = useState(false);

  const state = useSelector((state) => state.ProcessReducer);

  const disconnectUser = () => {
    
  };

  const messagesEndRef = useRef(null);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="process">
      <h2 style={{color: "white"}}>AES Encrypted Chat Application</h2>
      <h4>
        Seceret Key : <span>"obvwoqcbv21801f19d0zibcoavwpnq"</span>
      </h4>
      <div className="incomming">
        <h4>Incomming Data</h4>
        <p>{state.cypher}</p>
      </div>
      <div className="crypt">
        <h4>Decypted Data</h4>
        <p>{state.text}</p>
      </div>
      <button  onClick={disconnectUser}>Disconnect</button>
    </div>
  );
}
export default Process;