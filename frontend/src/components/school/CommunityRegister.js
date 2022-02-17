import Button from "components/commons/button";
import React, { useEffect } from "react";
import styled from "styled-components";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { createRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCommunityDetail,
  modifyCommunity,
  registerCommunity,
} from "api/community";
import { useDispatch, useSelector } from "react-redux";
import { errorAlert, successAlert, warnAlert } from "modules/alert";
import { logout } from "modules/user";
import Modal from "components/commons/modal";

const Container = styled.div`
  padding: 3rem 2rem;
  position: relative;
`;

const StyledInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-top: 1px solid #dadde6;
  font-size: 1.2rem;
  padding: 1rem 0.5rem;
`;

const BtnContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const Title = styled.div`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 2rem;
`;

const CommunityRegister = ({ modify }) => {
  const Navigate = useNavigate();
  const editorRef = createRef();
  const contentEmpty = `<p><br class="ProseMirror-trailingBreak"></p>`;
  const params = useParams();
  const { userId } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [data, setData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (modify && isLoading) {
      getCommunityDetail(params.communityId)
        .then((res) => {
          if (userId !== res.data.userId) {
            Navigate("../");
            //토스트로 바꾸기
            errorAlert(null, "수정 권한이 없습니다.");
            return () => {
              setIsLoading(false);
            };
          }
          setData({
            title: res.data.title,
            content: res.data.content,
          });
          setIsLoading(false);
        })
        .catch((e) => {
          if (e.response.status === 401) {
            errorAlert(401);
            dispatch(logout());
          } else {
            errorAlert(e.response.status, "게시글을 읽어오지 못했습니다.");
          }
        });
    }
  }, [isLoading]);

  const onChange = (e) => {
    setData({
      ...data,
      title: e.target.value,
    });
  };

  const onRegister = () => {
    if (
      data.title &&
      editorRef.current.getInstance().getHTML() !== contentEmpty
    ) {
      if (modify) {
        modifyCommunity({
          title: data.title,
          content: editorRef.current.getInstance().getHTML(),
          communityId: params.communityId,
        })
          .then(() => {
            successAlert("글 수정에 성공하였습니다.");
            Navigate(`../${params.communityId}`);
          })
          .catch((e) => {
            if (e.response.status === 401) {
              errorAlert(401);
              dispatch(logout());
            } else {
              errorAlert(e.response.status, "글 수정에 실패했습니다.");
            }
          });
      } else {
        registerCommunity({
          title: data.title,
          content: editorRef.current.getInstance().getHTML(),
        })
          .then(() => {
            successAlert("글 등록에 성공하였습니다.");
            Navigate("../");
          })
          .catch((e) => {
            if (e.response.status === 401) {
              errorAlert(401);
              dispatch(logout());
            } else {
              errorAlert(e.response.status, "글 등록에 실패했습니다.");
            }
          });
      }
    } else {
      warnAlert(null, "제목과 내용을 모두 작성해주세요.");
    }
  };

  const onCancle = () => {
    const url = modify ? `../${params.communityId}` : "../";
    console.log(params.communityId);
    Navigate(url);
  };

  return (
    <>
      <Container>
        {modify ? <Title>글 수정하기</Title> : <Title>글쓰기</Title>}
        <StyledInput
          onChange={onChange}
          value={data.title}
          name="title"
          placeholder="제목을 입력하세요."
        />
        {(!modify || !isLoading) && (
          <Editor
            name="content"
            initialValue={data.content}
            previewStyle="tab"
            height="500px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            ref={editorRef}
          />
        )}
        <BtnContainer>
          <Button
            name={modify ? "수정하기" : "글쓰기"}
            height="2.5rem"
            onClick={onRegister}
          />
          <Button
            name="취소"
            ml="1.5rem"
            height="2.5rem"
            bc="#C4C4C4"
            hoverColor="#a2a2a2"
            onClick={onCancle}
          />
        </BtnContainer>
        {showModal && (
          <Modal
            url={modify ? `../${params.communityId}` : `../`}
            message={modalMessage}
            setShowModal={setShowModal}
          />
        )}
      </Container>
    </>
  );
};

export default CommunityRegister;
