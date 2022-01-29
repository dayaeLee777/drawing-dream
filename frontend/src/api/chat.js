import SockJS from "sockjs-client";
import Stomp from "stompjs";
import axios from "axios";

const token =
  sessionStorage.getItem("access-token") ||
  localStorage.getItem("access-token");

const api = axios.create({
  headers: {
    "Content-Type": `application/json`,
    Authorization: `Bearer ${token}`,
  },
});

const socket = new SockJS("http://localhost:8080/ws-dd");
let client = Stomp.over(socket);

let headers = {
  Authorization: `Bearer ${token}`,
};

export const conn = (roomId) => {
  client.connect(headers, (frame) => {
    console.log("STOMP Connection");
    subscribe(roomId);
  });
};

export const disconnect = () => {
  client.disconnect();
};

const subscribe = ({ roomId }) => {
  client.subscribe(`/topic/room/${roomId}`, ({ response }) => {
    // setChatMessages((_chatMessages) => [..._chatMessages, JSON.parse(body)]);
    console.log(response);
  });
};

export const getRooms = async (success, fail) => {
  return await api.get("api/chat/room/all").then(success).catch(fail);
};

// let client = new StompJs.Client({
//   brokerURL: "ws://localhost:8080/ws-dd",
//   connectHeaders: {
//     Authorization: `Bearer ${token}`,
//   },
//   debug: function (str) {
//     console.log(str);
//   },
//   reconnectDelay: 5000,
//   heartbeatIncoming: 4000,
//   heartbeatOutgoing: 4000,
//   onConnect: (frame) => {
//     subscribe();
//   },
//   onStompError: (frame) => {
//     console.error(frame);
//   },
// });
// export const publish = (roomId, content) => {
//   if (!client.current.connected) {
//     return;
//   }

//   client.publish("app/chat/room", {
//     roomId,
//     content,
//   });
// };

// expor{ conn, disconnect, subscribe, publish };
