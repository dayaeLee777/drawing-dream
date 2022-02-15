import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Viewer } from "@toast-ui/react-editor";
import { useNavigate, useParams } from "react-router-dom";
import { deleteCommunity, getCommunityDetail } from "api/community";
import { useSelector } from "react-redux";
import CommentList from "./comment/CommentList";
import { getProfileImg } from "api/user";
import blankProfile from "assets/img/blank-profile.png";

const DetailContainer = styled.div`
  padding: 3rem 5rem;
  box-sizing: border-box;
  width: 100%;
  overflow: auto;
`;

const BoardContainer = styled.div`
  border: 1px solid #dadde6;
  box-sizing: border-box;
  width: 100%;
  padding: 0 1rem;
  border-radius: 5px;
  margin-top: 0.5rem;
  min-height: 20rem;
  background-color: white;
`;
const TitleContainer = styled.div`
  .title {
    font-size: 2.5rem;
    font-weight: 600;
  }
`;
const ProfileContainer = styled.div`
  padding-left: 0.5rem;
  margin-top: 1rem;
  color: ${({ theme }) => theme.textColor};
  display: flex;
  align-items: center;

  img {
    width: 2rem;
    height: 2rem;
    border-radius: 45px;
    margin-right: 0.5rem;
  }

  .userName {
    font-size: 1rem;
    margin-right: 1rem;
  }
  .regTime {
    font-size: 0.8rem;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
  /* span {
    display: flex;
    align-items: center;
  } */
`;

const EditContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
  font-size: 0.8rem;
  text-align: right;

  .edit,
  .delete {
    margin-right: 0.5rem;
    text-decoration: underline;
    color: #787878;
    cursor: pointer;
  }
`;

const CommunityDetail = () => {
  const params = useParams();
  const Navigate = useNavigate();
  const [profileUrl, setProfileUrl] = useState();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useSelector((state) => state.user);

  useEffect(() => {
    let communityUserId = "";
    if (isLoading) {
      getCommunityDetail(params.communityId)
        .then((res) => {
          setData(res.data);
          communityUserId = res.data.userId;
        })
        .then(() => {
          console.log(communityUserId);
          getProfileImg(communityUserId).then((res) => {
            setProfileUrl(res.data.fileName);
            setIsLoading(false);
          });
        })
        .catch(() => {
          Navigate("../");
          return () => {
            setIsLoading(false);
          };
        });
    }
  }, [isLoading]);

  const onDelete = () => {
    deleteCommunity(params.communityId).then(() => {
      alert("글이 삭제되었습니다.");
      Navigate("../");
    });
  };

  const onModify = () => {
    Navigate(`../modify/${params.communityId}`);
  };

  let time;
  let timeArr;
  if (!isLoading) {
    timeArr = data.regTime.split(" ");
    time = timeArr[0] + " " + timeArr[1].split(".")[0];
  }
  return (
    <DetailContainer>
      {!isLoading && (
        <TitleContainer>
          <div className="title">{data.title}</div>
          <ProfileContainer>
            <img
              src={profileUrl ? profileUrl : blankProfile}
              alt="프로필이미지"
            />
            <>
              <span className="userName">{data.userName}</span>
              <span className="regTime">{time}</span>
            </>
          </ProfileContainer>
          <EditContainer>
            {userId === data.userId && (
              <>
                <span className="edit" onClick={onModify}>
                  수정하기
                </span>
                <span className="delete" onClick={onDelete}>
                  삭제하기
                </span>
              </>
            )}
          </EditContainer>
        </TitleContainer>
      )}
      {!isLoading && (
        <BoardContainer>
          <Viewer initialValue={`${data.content}`} />
        </BoardContainer>
      )}

      <CommentList communityId={params.communityId} />
    </DetailContainer>
  );
};

export default CommunityDetail;
