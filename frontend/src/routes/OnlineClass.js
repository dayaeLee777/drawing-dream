import commonCode from "config/commonCode";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const OnlineClass = () => {
  const roomId = useParams().roomid;
  useEffect(() => {
    const ws = new WebSocket("wss://localhost:8443/groupcall");
    console.log(ws);
    const message = {
      id: "joinRoom",
      name: commonCode.G.G05.G0500,
      room: roomId,
    };

    ws.onopen = () => {
      ws.send(message);
    };
  }, []);
  return <div></div>;
};

export default OnlineClass;
