import commonCode from "config/commonCode";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import kurentoUtils from "kurento-utils";
import styled from "styled-components";
import Chat from "components/onlineclass/Chat";
/*
 * (C) Copyright 2014 Kurento (http://kurento.org/)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

const Container = styled.div`
  margin: 4rem 10vw;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: 600;
  margin: 2rem;
  letter-spacing: -1px;
`;

const TeacherVideoContainer = styled.div`
  width: 60vw;
  height: 70vh;
`;
const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const ParticipantVideoContainer = styled.div`
  width: 12vw;
  height: 15vh;
  display: flex;
  margin-top: 2rem;
`;

const OnlineClass = () => {
  const roomId = useParams().roomid;
  // useEffect(() => {
  let ws = new WebSocket("wss://localhost:8443/groupcall");
  let participants = {};
  let participantCnt = 0;
  let room = roomId;
  const { userId, userName } = useSelector((state) => state.user);
  const PARTICIPANT_MAIN_CLASS = "participant main";
  const PARTICIPANT_CLASS = "participant";

  const [teacherVideo, setTecherVideo] = useState(false);
  /**
   * Creates a video element for a new participant
   *
   * @param {String} name - the name of the new participant, to be used as tag
   *                        name of the video element.
   *                        The tag of the new element will be 'video<name>'
   * @return
   */
  class Participant {
    constructor(name, participantCnt) {
      this.name = name;
      this.participantCnt = participantCnt;
      // container.className = isPresentMainParticipant()
      //   ? PARTICIPANT_CLASS
      //   : PARTICIPANT_MAIN_CLASS;
      // container.id = name;
      // var span = document.createElement("span");
      var rtcPeer;

      let video;
      if (participantCnt === 0) {
        video = document.createElement("video");
        video.id = "video-" + userId;
        video.autoplay = true;
        video.controls = false;
        video.style.borderRadius = "10px";
        video.style.width = "100%";
        video.style.height = "100%";
        video.style.objectFit = "cover";
        document.getElementById("teacher").appendChild(video);
      } else {
        video = document.createElement("video");
        video.id = "video-" + userId;
        video.autoplay = true;
        video.controls = false;
        video.style.width = "100%";
        video.style.height = "100%";
        video.style.objectFit = "cover";
        video.style.borderRadius = "10px";
        document.getElementById("participants").appendChild(video);
      }

      this.getVideoElement = function () {
        return video;
      };

      // function switchContainerClass() {
      //   if (container.className === PARTICIPANT_CLASS) {
      //     var elements = Array.prototype.slice.call(
      //       document.getElementsByClassName(PARTICIPANT_MAIN_CLASS)
      //     );
      //     elements.forEach(function (item) {
      //       item.className = PARTICIPANT_CLASS;
      //     });

      //     container.className = PARTICIPANT_MAIN_CLASS;
      //   } else {
      //     container.className = PARTICIPANT_CLASS;
      //   }
      // }

      // function isPresentMainParticipant() {
      //   return (
      //     document.getElementsByClassName(PARTICIPANT_MAIN_CLASS).length != 0
      //   );
      // }

      this.offerToReceiveVideo = function (error, offerSdp, wp) {
        if (error) return console.error("sdp offer error");
        console.log("Invoking SDP offer callback function");
        var msg = { id: "receiveVideoFrom", sender: name, sdpOffer: offerSdp };
        sendMessage(msg);
      };

      this.onIceCandidate = function (candidate, wp) {
        console.log("Local candidate" + JSON.stringify(candidate));

        var message = {
          id: "onIceCandidate",
          candidate: candidate,
          name: name,
        };
        sendMessage(message);
      };

      // Object.defineProperty(this, "rtcPeer", { writable: true });

      this.dispose = function () {
        console.log("Disposing participant " + this.name);
        this.rtcPeer.dispose();
        // container.parentNode.removeChild(container);
      };
    }
  }

  ws.onmessage = function (message) {
    var parsedMessage = JSON.parse(message.data);
    console.info("Received message: " + message.data);

    switch (parsedMessage.id) {
      case "existingParticipants":
        onExistingParticipants(parsedMessage);
        break;
      case "newParticipantArrived":
        onNewParticipant(parsedMessage);
        break;
      case "participantLeft":
        onParticipantLeft(parsedMessage);
        break;
      case "receiveVideoAnswer":
        receiveVideoResponse(parsedMessage);
        break;
      case "iceCandidate":
        participants[parsedMessage.name].rtcPeer.addIceCandidate(
          parsedMessage.candidate,
          function (error) {
            if (error) {
              console.error("Error adding candidate: " + error);
              return;
            }
          }
        );
        break;
      default:
        console.error("Unrecognized message", parsedMessage);
    }
  };

  ws.onopen = () => {
    const message = {
      id: "joinRoom",
      name: userName,
      room: roomId,
      participantCnt: participantCnt,
    };
    ws.send(JSON.stringify(message));
  };

  // async function getConnectedDevices(type) {
  //   navigator.mediaDevices
  //     .enumerateDevices()
  //     .then(function (devices) {
  //       devices.forEach(function (device) {
  //         console.log(
  //           device.kind + ": " + device.label + " id = " + device.deviceId
  //         );
  //       });
  //     })
  //     .catch(function (err) {
  //       console.log(err.name + ": " + err.message);
  //     });
  // }

  // getConnectedDevices("videoinput");
  // console.log(videoCamera);

  function onNewParticipant(request) {
    receiveVideo(request.name);
  }

  function receiveVideoResponse(result) {
    participants[result.name].rtcPeer.processAnswer(
      result.sdpAnswer,
      function (error) {
        if (error) return console.error(error);
      }
    );
  }

  // function callResponse(message) {
  //   if (message.response != "accepted") {
  //     console.info("Call not accepted by peer. Closing call");
  //     stop();
  //   } else {
  //     webRtcPeer.processAnswer(message.sdpAnswer, function (error) {
  //       if (error) return console.error(error);
  //     });
  //   }
  // }

  function onExistingParticipants(msg) {
    var constraints = {
      audio: true,
      video: {
        mandatory: {
          maxWidth: 320,
          maxFrameRate: 15,
          minFrameRate: 15,
        },
      },
    };
    console.log(userName + " registered in room " + room);
    var participant = new Participant(userName, participantCnt++);
    participants[userName] = participant;
    var video = participant.getVideoElement();
    console.log(video);
    var options = {
      localVideo: video,
      mediaConstraints: constraints,
      onicecandidate: participant.onIceCandidate.bind(participant),
    };
    participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(
      options,
      function (error) {
        if (error) {
          return console.error(error);
        }
        this.generateOffer(participant.offerToReceiveVideo.bind(participant));
      }
    );

    msg.data.forEach(receiveVideo);
  }

  function leaveRoom() {
    sendMessage({
      id: "leaveRoom",
    });

    for (var key in participants) {
      participants[key].dispose();
    }

    document.getElementById("join").style.display = "block";
    document.getElementById("room").style.display = "none";

    ws.close();
  }

  function receiveVideo(sender) {
    var participant = new Participant(sender, participantCnt);
    participants[sender] = participant;
    var video = participant.getVideoElement();

    var options = {
      remoteVideo: video,
      onicecandidate: participant.onIceCandidate.bind(participant),
    };

    participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(
      options,
      function (error) {
        if (error) {
          return console.error(error);
        }
        this.generateOffer(participant.offerToReceiveVideo.bind(participant));
      }
    );
  }

  function onParticipantLeft(request) {
    console.log("Participant " + request.name + " left");
    var participant = participants[request.name];
    participant.dispose();
    delete participants[request.name];
  }

  function sendMessage(message) {
    var jsonMessage = JSON.stringify(message);
    console.log("Sending message: " + jsonMessage);
    ws.send(jsonMessage);
  }
  // }, []);
  return (
    <>
      <Container>
        <Title>{commonCode.G.G05.G0500}: 박선생 선생님</Title>
        <Wrapper>
          <TeacherVideoContainer id="teacher"></TeacherVideoContainer>
          <Chat />
        </Wrapper>
        <ParticipantVideoContainer id="participants"></ParticipantVideoContainer>
      </Container>
    </>
  );
};

export default OnlineClass;
