import commonCode from "config/commonCode";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import kurentoUtils from "kurento-utils";
import styled from "styled-components";
import Chat from "components/onlineclass/Chat";
import { getCouresInfo } from "api/course";
import Button from "components/commons/button";
import { deleteOnlineClass } from "api/onlineclass";
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

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.div`
  font-size: 2rem;
  font-weight: 600;
  margin: 2rem;
  letter-spacing: -1px;
`;

const ControlContainer = styled.div``;
const TeacherVideoContainer = styled.div`
  width: 60vw;
  height: 70vh;
  video::-webkit-media-controls-timeline {
    display: none;
  }
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

const userName = styled.div`
  position: absolute;
  z-index: 1;
  width: 5rem;
`;

const OnlineClass = () => {
  const roomId = useParams().roomid;
  // useEffect(() => {
  let ws = new WebSocket("wss://localhost:8443/groupcall");
  let participants = {};
  let room = roomId;
  const { userId, userName, userCode } = useSelector((state) => state.user);
  const PARTICIPANT_MAIN_CLASS = "participant main";
  const PARTICIPANT_CLASS = "participant";

  const [teacherVideo, setTecherVideo] = useState(false);
  const [courseInfo, setCourseInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      getCouresInfo(roomId).then((res) => {
        // console.log(res);
        setCourseInfo(res.data);
        setIsLoading(false);
      });
    }
  }, []);

  /**
   * Creates a video element for a new participant
   *
   * @param {String} name - the name of the new participant, to be used as tag
   *                        name of the video element.
   *                        The tag of the new element will be 'video<name>'
   * @return
   */
  class Participant {
    constructor(name) {
      this.name = name;
      // container.className = isPresentMainParticipant()
      //   ? PARTICIPANT_CLASS
      //   : PARTICIPANT_MAIN_CLASS;
      // container.id = name;
      // var span = document.createElement("span");
      var rtcPeer;

      let video;
      if (name === courseInfo.teacherName) {
        // console.log("hi");
        video = document.createElement("video");
        video.id = "video-" + name;
        video.autoplay = true;
        video.controls = false;
        video.style.borderRadius = "10px";
        video.style.width = "100%";
        video.style.height = "100%";
        video.style.objectFit = "cover";
        document.getElementById("teacher").appendChild(video);
      } else {
        video = document.createElement("video");
        video.id = "video-" + name;
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
        var msg = {
          id: "receiveVideoFrom",
          sender: name,
          sdpOffer: offerSdp,
        };
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
  if (!isLoading) {
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
  }
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
    var participant = new Participant(userName);
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
    navigate("/home");
    ws.close();
  }

  function receiveVideo(sender) {
    var participant = new Participant(sender);
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

  const deleteRoom = () => {
    deleteOnlineClass(roomId).then((res) => {
      console.log(res);
    });

    leaveRoom();
  };

  const vidOnOff = () => {
    let myVideo = document.getElementById("video-" + userName);
    if (showVideo) {
      myVideo.pause();
      setShowVideo(false);
    } else {
      myVideo.play();
      setShowVideo(true);
    }
  };

  return (
    <>
      <Container>
        <Header>
          {courseInfo && (
            <Title>
              {
                commonCode[courseInfo.subjectCode.substr(0, 1)][
                  courseInfo.subjectCode.substr(0, 3)
                ][courseInfo.subjectCode]
              }
              : {courseInfo.teacherName} 선생님
            </Title>
          )}
          <ControlContainer>
            <button onClick={vidOnOff}>비디오 중지</button>
          </ControlContainer>
          {userCode === "A03" ? (
            <Button
              onClick={deleteRoom}
              height="3rem"
              name="수업 종료하기"
            ></Button>
          ) : (
            <Button
              height="3rem"
              name="수업 나가기"
              onClick={leaveRoom}
            ></Button>
          )}
        </Header>
        <Wrapper>
          <TeacherVideoContainer id="teacher"></TeacherVideoContainer>
          <Chat courseId={roomId} />
        </Wrapper>
        <ParticipantVideoContainer id="participants"></ParticipantVideoContainer>
      </Container>
    </>
  );
};

export default OnlineClass;
