import Button from "components/commons/button";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import validationCheck from "components/signup/validationCheck";
import InputContainer from "components/commons/inputContainer";
import { useNavigate } from "react-router-dom";
import { modifyPassword, passwordCheck } from "api/user";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.ContainerColor};
  height: 80vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 3rem;
  width: 44rem;
  overflow: auto;
  
`;

const Desc = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 5rem;
`;

const ModifyContainer = styled.div`
  width: 50%;
  display: flex;
  padding-right: 2rem;
  flex-direction: column;
  justify-content: flex-start;
`;
const InputBlock = styled.div`
  display: flex;
`;

const ModifyPassword = () => {
  const [inputs, setInputs] = useState({
    nowPassword: "",
    password: "",
    passwordConfirm: "",
  });

  const Navigate = useNavigate();

  // VALIDATION STATE
  const [valids, setValids] = useState({
    validPassword: true,
    equalPassword: true,
  });
  // VALIDATION END

  // ERROR MSG STATE
  const [errors, setErrors] = useState({
    passwordErrMsg: "",
    equalPasswordErrMsg: "",
  });
  // ERROR MSG END

  const onChange = (e) => {
    validationCheck(e, inputs, setInputs, valids, setValids, errors, setErrors);
  };

  const onSubmit = async () => {
    if (inputs.nowPassword && valids.validPassword && valids.equalPassword) {
      passwordCheck({ password: inputs.nowPassword })
        .then((res) => {
          console.log(res);
          if (res.data.statusCode === 200) {
            modifyPassword({ password: inputs.password })
              .then((res) => {
                if (res.data.statusCode === 200) {
                  alert("비밀번호를 변경하였습니다.");
                  Navigate("/home");
                } else if (res.data.statusCode === 202) {
                  alert("입력하신 비밀번호가 현재 비밀번호와 일치합니다.");
                }
              })
              .catch(() => {
                alert("비밀번호 변경에 실패하였습니다.");
              });
          }
        })
        .catch(() => {
          alert("현재 비밀번호가 일치하지 않습니다.");
        });
    } else {
      alert("필수 입력 항목을 확인해주세요.");
    }
    // 프로필 수정 요청 END
  };

  const onCancle = () => {
    Navigate("/home");
  };

  return (
    <>
      <FormContainer>
        <Container>
          <Desc>비밀번호 변경</Desc>
          <ModifyContainer>
            <InputContainer
              desc="현재 비밀번호"
              star
              type="password"
              onChange={onChange}
              name="nowPassword"
            />

            <InputContainer
              desc="새 비밀번호ㅤ"
              star
              type="password"
              onChange={onChange}
              name="password"
              isValid={valids.validPassword}
              errMsg={errors.passwordErrMsg}
              mt="2rem"
            />
            <InputContainer
              desc="비밀번호 확인"
              star
              type="password"
              onChange={onChange}
              name="passwordConfirm"
              isValid={valids.equalPassword}
              errMsg={errors.equalPasswordErrMsg}
            />
          </ModifyContainer>
          <InputBlock>
            <Button
              name="수정 하기"
              mt="3rem"
              mr="1rem"
              height="3rem"
              onClick={onSubmit}
            />
            <Button
              name="취소"
              mt="3rem"
              bc="#C4C4C4"
              height="3rem"
              hoverColor="#a2a2a2"
              onClick={onCancle}
            />
          </InputBlock>
        </Container>
      </FormContainer>
    </>
  );
};
export default ModifyPassword;
