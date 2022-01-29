import Button from "components/commons/button";
import Input from "components/commons/input";
import React, { useState } from "react";
import styled from "styled-components";
import logo from "assets/img/logo.png";
import PostCode from "components/signup/postcode/FindPostCode";
import SchoolCode from "components/signup/school/SchoolCode";
import { useNavigate } from "react-router-dom";
import validationCheck from "components/signup/validationCheck";
import { signUp } from "api/user";
import { ReactNewWindowStyles } from "react-new-window-styles";
import InputContainer from "components/commons/inputContainer";
import commonCode from "config/commonCode";

const Container = styled.div`
  display: flex;
  background-color: #fec25c;
  width: 100vw;
  height: 100vh;
  justify-content: center;
`;
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 40rem;
  background-color: white;
  padding-top: 3rem;
  box-shadow: rgba(99, 99, 99, 0.5) 0px 2px 8px 0px;
  padding: 0 8rem;
`;
const Logo = styled.img`
  width: 7rem;
  height: fit-content;
`;
const Desc = styled.div`
  font-size: 2.5rem;
  margin: 3rem 0;
  font-weight: 600;
`;
const InputBlock = styled.div`
  display: flex;
`;
const Wrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;
  .desc {
    width: ${(props) => (props.small ? "4rem" : "8rem")};
    height: 2rem;
    display: flex;
    align-items: center;
    .star {
      padding-top: 0.5rem;
      margin-left: 0.5rem;
      align-items: center;
      color: red;
      font-size: 1.5rem;
    }
  }
`;
const SelectBox = styled.select`
  width: 4rem;
  height: 2.3rem;
  border-radius: 5px;
  text-align: center;
  margin-right: 1rem;
`;

const SignUp = () => {
  const Navigate = useNavigate();

  // 주소 찾기, 학교 찾기 새 창열기
  const [isPostCodeOpen, setIsPostCodeOpen] = useState(false);
  const [isSchoolCodeOpen, setIsSchoolCodeOpen] = useState(false);

  const openPostCode = () => {
    setIsPostCodeOpen(true);
  };
  const closePostCode = () => {
    setIsPostCodeOpen(false);
  };
  const openSchoolCode = () => {
    setIsSchoolCodeOpen(true);
  };
  const closeSchoolCode = () => {
    setIsSchoolCodeOpen(false);
  };
  // 주소 찾기 학교 찾기 END

  // USER INFO STATE
  const [inputs, setInputs] = useState({
    userId: "",
    userName: "",
    password: "",
    phoneNumber: "",
    parentPhoneNumber: "",
    email: "",
    addressDetail: "",
    gradeCode: "",
    classCode: "",
    studentNo: "",
  });
  // USER INFO END

  // VALIDATION STATE
  const [valids, setValids] = useState({
    validId: false,
    validName: false,
    validPassword: false,
    equelPassword: false,
    validEmail: false,
  });
  // VALIDATION END

  // ERROR MSG STATE
  const [errors, setErrors] = useState({
    idErrMsg: "",
    nameErrMsg: "",
    passwordErrMsg: "",
    equelPasswordErrMsg: "",
    emailErrMsg: "",
  });
  // ERROR MSG END

  const {
    userId,
    userName,
    password,
    phoneNumber,
    parentPhoneNumber,
    email,
    addressDetail,
    gradeCode,
    classCode,
    studentNo,
  } = inputs;

  const { validId, validName, validPassword, equelPassword, validEmail } =
    valids;

  const {
    idErrMsg,
    nameErrMsg,
    passwordErrMsg,
    equelPasswordErrMsg,
    emailErrMsg,
  } = errors;

  // 유효성 검사
  const onChange = (e) => {
    validationCheck(e, inputs, setInputs, valids, setValids, errors, setErrors);
  };

  // ADDRESS, SCHOOL INFO STATE
  const [fullAddress, setFullAddress] = useState("");
  const [schoolCode, setSchoolCode] = useState("");
  const [schoolName, setSchoolName] = useState("");
  // ADDRESS, SCHOOL INFO END

  // GRADECODE, CLASSCODE SET
  const onGradeCodeSelect = (e) => {
    let { value, name } = e.target;
    if (name === "gradeCode")
      setInputs({
        ...inputs,
        gradeCode: value,
      });
    else if (name === "classCode")
      setInputs({
        ...inputs,
        classCode: value,
      });
  };
  // GRADECODE CLASSCODE SET END

  // 회원 가입 요청
  const onSubmit = async () => {
    if (
      validId &&
      validName &&
      validEmail &&
      validPassword &&
      equelPassword &&
      schoolCode &&
      gradeCode &&
      classCode &&
      studentNo
    ) {
      try {
        const user = {
          address: fullAddress + " " + addressDetail,
          classCode: classCode,
          gradeCode: gradeCode,
          loginId: userId,
          parentPhone: parentPhoneNumber,
          password: password,
          phone: phoneNumber,
          schoolName: schoolName,
          schoolSerialNo: schoolCode,
          studentNo: studentNo,
          userEmail: email,
          userName: userName,
        };

        signUp(user).then((res) => {
          if (res.status === 201) {
            alert("회원가입에 성공하였습니다.");
            Navigate("/signin");
          }
        });
      } catch (e) {}
    } else {
      alert("필수 입력 항목을 확인해주세요.");
    }
  };
  // 회원가입 요청 END

  return (
    <Container>
      {isPostCodeOpen && (
        <ReactNewWindowStyles
          title="주소찾기"
          onClose={closePostCode}
          windowProps={{ width: 580, height: 600 }}
        >
          <PostCode setFullAddress={setFullAddress} onClose={closePostCode} />
        </ReactNewWindowStyles>
      )}
      {isSchoolCodeOpen && (
        <ReactNewWindowStyles
          title="학교찾기"
          onClose={closeSchoolCode}
          windowProps={{ width: 580, height: 600 }}
        >
          <SchoolCode
            setSchoolName={setSchoolName}
            setSchoolCode={setSchoolCode}
            onClose={closeSchoolCode}
          />
        </ReactNewWindowStyles>
      )}
      <MainContainer>
        <Logo src={logo} alt="logo" />
        <Desc>회원 가입</Desc>
        <InputContainer
          desc="아이디"
          star
          onChange={onChange}
          name="userId"
          isValid={validId}
          errMsg={idErrMsg}
        />
        <InputContainer
          desc="이름"
          star
          onChange={onChange}
          name="userName"
          isValid={validName}
          errMsg={nameErrMsg}
        />
        <InputContainer
          desc="비밀번호"
          type="password"
          star
          onChange={onChange}
          name="password"
          isValid={validPassword}
          errMsg={passwordErrMsg}
        />
        <InputContainer
          desc="비밀번호 확인"
          type="password"
          star
          onChange={onChange}
          name="passwordConfirm"
          isValid={equelPassword}
          errMsg={equelPasswordErrMsg}
        />
        <InputBlock>
          <InputContainer
            desc="전화번호"
            onChange={onChange}
            name="phoneNumber"
          />
          <InputContainer
            desc="보호자 전화번호"
            onChange={onChange}
            name="parentPhoneNumber"
          />
        </InputBlock>
        <InputContainer
          desc="이메일"
          star
          onChange={onChange}
          name="email"
          isValid={validEmail}
          errMsg={emailErrMsg}
        />
        <InputBlock>
          <Wrapper>
            <div className="desc">주소</div>
            {fullAddress && (
              <Input mr="1rem" width="25rem" value={fullAddress} readOnly />
            )}
            <Button
              name="도로명 주소 찾기"
              width={fullAddress ? "8rem" : "12.75rem"}
              height="2.1rem"
              onClick={openPostCode}
            />
          </Wrapper>
        </InputBlock>
        <InputContainer
          desc="상세주소"
          onChange={onChange}
          name="emaiaddressDetaill"
          width="25rem"
        />

        <InputBlock>
          <Wrapper>
            <div className="desc">
              학교
              <div className="star">*</div>
            </div>
            {schoolName && <Input value={schoolName} readOnly mr="1rem" />}
            <Button
              width={schoolName ? "6rem" : "12.75rem"}
              name="학교 찾기"
              height="2.1rem"
              onClick={openSchoolCode}
            />
          </Wrapper>
        </InputBlock>

        <InputBlock>
          <Wrapper>
            <div className="desc">
              학년<div className="star">*</div>
            </div>
            <SelectBox
              onChange={onGradeCodeSelect}
              name="gradeCode"
              defaultValue="default"
            >
              <option value="default" disabled hidden>
                선택
              </option>
              {Object.entries(commonCode.E).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </SelectBox>
          </Wrapper>

          <Wrapper small>
            <div className="desc">
              반<div className="star">*</div>
            </div>
            <SelectBox
              onChange={onGradeCodeSelect}
              name="classCode"
              defaultValue="default"
            >
              <option value="default" disabled hidden>
                선택
              </option>
              {Object.entries(commonCode.F).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </SelectBox>
          </Wrapper>

          <Wrapper small>
            <div className="desc">
              번호<div className="star">*</div>
            </div>
            <Input
              name="studentNo"
              value={studentNo}
              onChange={onChange}
              width="3rem"
              height="2rem"
            />
          </Wrapper>
        </InputBlock>
        <InputBlock>
          <Button
            name="가입 신청"
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
          />
        </InputBlock>
      </MainContainer>
    </Container>
  );
};

export default SignUp;
