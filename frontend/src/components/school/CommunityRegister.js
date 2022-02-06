import Button from "components/commons/button";
import Input from "components/commons/input";
import React from "react";
import styled from "styled-components";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { createRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 3rem 2rem;
`;

const StyledInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #DADDE6;
  border-radius: 5px;
  border-bottom: none;
  font-size: 1.5rem;
  padding: 0.5rem;
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
  margin-bottom: 3rem;
`;

const CommunityRegister = ({ setIsRegister }) => {
  const Navigate = useNavigate();
  const [content, setContent] = useState("");
  const editorRef = createRef();

  const onChange = () => {
    // setContent(editorRef.current.getInstance().getHTML());
    console.log(editorRef.current.getInstance().getHTML());
  };

  const onClickCancle = () => {
    setIsRegister(false);
  };
  return (
    <Container>
      <Title>글쓰기</Title>
      <StyledInput placeholder="제목을 입력하세요."/>

      <Editor
        initialValue={content}
        previewStyle="tab"
        height="500px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        ref={editorRef}
        onChange={onChange}
      />
      <BtnContainer>
        <Button name="글쓰기" height="2.5rem" />
        <Button
          name="취소"
          ml="1.5rem"
          height="2.5rem"
          bc="#C4C4C4"
          hoverColor="#a2a2a2"
          onClick={() => Navigate('../')}
        />
      </BtnContainer>
    </Container>
  );
};

export default CommunityRegister;
