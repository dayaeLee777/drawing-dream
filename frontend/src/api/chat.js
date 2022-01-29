import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import Stomp from "stompjs";

const token =
  sessionStorage.getItem("access-token") ||
  localStorage.getItem("access-token");

const socket = new SockJS("http://localhost:8080/ws-dd");
let client = Stomp.over(socket);

let headers = {
  Authorization: `Bearer ${token}`,
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

export const connect = () => {
  client.connect(headers, (frame) => {
    subscribe();
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

// export const publish = (roomId, content) => {
//   if (!client.current.connected) {
//     return;
//   }

//   client.publish("app/chat/room", {
//     roomId,
//     content,
//   });
// };

// expor{ connect, disconnect, subscribe, publish };
