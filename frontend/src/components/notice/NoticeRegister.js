import Button from "components/commons/button";
import React, { useEffect } from "react";
import styled from "styled-components";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { createRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getNoticeDetail, modifyNotice, registerNotice } from "api/notice";
import commonCode from "config/commonCode";
import Dropzone from "react-dropzone";
import { FileIcon, defaultStyles } from "react-file-icon";

const Container = styled.div`
  padding: 3rem 2rem 0 2rem;
`;

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  border-top: 1px solid #dadde6;

  select {
    width: 10rem;
    border: none;
    padding: 1rem 0.5rem;
    font-size: 1rem;
    /* border-right: 1px solid #dadde6; */
  }

  input {
    width: 100%;
    border: none;
    padding: 1rem 0.5rem;
    font-size: 1.2rem;
  }
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
  margin-bottom: 1.5rem;
`;

const FileContainer = styled.div`
  margin-top: 1rem;
  /* background-color: yellow; */

  .dropzone {
    text-align: center;
    padding: 20px;
    border: 3px dashed #eeeeee;
    background-color: #fafafa;
    color: #bdbdbd;
  }

  .files {
    margin-top: 0.5rem;
    display: flex;
    padding: 0rem 0.5rem;
    
    .file {
      display: flex;
      border-radius: 5px;
      border: 1px solid #e4e4e4;
      padding: 0.2rem 0.4rem;
      margin-right: 0.5rem;
      .icon {
        width: 0.7rem;
        margin-right: 0.3rem;
      }
      .desc {
        font-size: 0.9rem;
        color: #666666;
      }
    }
  }

`;

const NoticeRegister = ({ modify }) => {
  const Navigate = useNavigate();
  const editorRef = createRef();
  const contentEmpty = `<p><br class="ProseMirror-trailingBreak"></p>`;
  const params = useParams();
  const { userId } = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState({
    title: "",
    content: "",
    noticeCode: "",
    files: null,
  });

  useEffect(() => {
    if (modify && isLoading) {
      getNoticeDetail(params.noticeId).then((res) => {
        if (userId !== res.data.userId) {
          Navigate("../");
          alert("수정 권한이 없습니다.");
          return () => {
            setIsLoading(false);
          };
        }
        setData({
          title: res.data.title,
          content: res.data.content,
          noticeCode: res.data.noticeCode,
          // files: res.data.files
        });
        setIsLoading(false);
      });
    }
  }, [isLoading]);

  const onChange = (e) => {
    if (e.target.name === "file") {
      setData({
        ...data,
        files: e.target.files,
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onRegister = () => {
    if (
      data.title &&
      editorRef.current.getInstance().getHTML() !== contentEmpty &&
      data.noticeCode
    ) {
      if (modify) {
        let formData = new FormData();
        if (data.files) {
          for (let i = 0; i < data.files.length; i++) {
            formData.append("multipartFile", data.files[i]);
          }
        }
        formData.append(
          "noticeUpdateRequestDto",
          new Blob(
            [
              JSON.stringify({
                title: data.title,
                content: editorRef.current.getInstance().getHTML(),
                noticeCode: data.noticeCode,
                noticeId: params.noticeId,
              }),
            ],
            { type: "application/json" }
          )
        );
        modifyNotice(formData).then(
          alert("글 수정에 성공하였습니다."),
          Navigate(`../${params.noticeId}`)
        );
      } else {
        let formData = new FormData();
        if (data.files) {
          for (let i = 0; i < data.files.length; i++) {
            formData.append("multipartFile", data.files[i]);
          }
        }
        formData.append(
          "noticeRegisterRequestDto",
          new Blob(
            [
              JSON.stringify({
                title: data.title,
                content: editorRef.current.getInstance().getHTML(),
                noticeCode: data.noticeCode,
              }),
            ],
            { type: "application/json" }
          )
        );
        registerNotice(formData).then(() => {
          alert("글 등록에 성공하였습니다.");
          Navigate("../");
        });
      }
    } else {
      alert("제목과 내용, 구분을 모두 작성해주세요.");
    }
  };

  const onCancle = () => {
    const url = modify ? `../${params.communityId}` : "../";
    Navigate(url);
  };

  const handleDrop = (acceptedFiles) => {
    setData({
      ...data,
      files: acceptedFiles.map((file) => file),
    });
  };

  const makeExtension = (fileName) => {
    let fileLength = fileName.length;
    let fileDot = fileName.lastIndexOf(".");
    let fileExtension = fileName.substring(fileDot + 1, fileLength).toLowerCase();
    return fileExtension;
  }

  return (
    <Container>
      {modify ? <Title>글 수정하기</Title> : <Title>글쓰기</Title>}
      <InputContainer>
        {(!modify || !isLoading) && (
          <select
            name="noticeCode"
            defaultValue={data.noticeCode ? data.noticeCode : "default"}
            onChange={onChange}
          >
            <option value="default" disabled hidden>
              구분
            </option>
            {Object.entries(commonCode.K).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        )}
        <input
          onChange={onChange}
          value={data.title}
          name="title"
          placeholder="제목을 입력하세요."
        />
      </InputContainer>
      {(!modify || !isLoading) && (
        <Editor
          name="content"
          initialValue={data.content}
          previewStyle="tab"
          height="400px"
          initialEditType="wysiwyg"
          useCommandShortcut={true}
          ref={editorRef}
        />
      )}
      <FileContainer>
        <Dropzone onDrop={handleDrop} className="dropzone">
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <p>첨부할 파일을 클릭 또는 드래그하여 올려주세요.</p>
            </div>
          )}
        </Dropzone>
        {data.files &&
          <div className="files">
            {data.files.map((file) => (
              <div key={file.name}>
                <div className="file">
                  <div className="icon">
                    <FileIcon extension={ makeExtension(file.name) } {...defaultStyles[makeExtension(file.name)]} />
                  </div>
                  <div className="desc">
                    {file.name}
                  </div>
                </div>
              </div>
              ))}
          </div>
        }
      </FileContainer>
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
    </Container>
  );
};

export default NoticeRegister;
