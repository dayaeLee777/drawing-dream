import Button from "components/commons/button";
import Input from "components/commons/input";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import blankProfile from "assets/img/blank-profile.png";
import NewWindow from "react-new-window";
import PostCode from "components/signup/postcode/FindPostCode";
import { getUser, idCheck } from "api/user";
import { useSelector } from "react-redux";
import validationCheck from "components/signup/validationCheck";

const FormContainer = styled.div`
  /* width: 50rem;
  height: 40rem; */
  box-sizing: border-box;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Star = styled.article`
  padding-top: 0.5rem;
  margin-left: 0.5rem;
  align-items: center;
  color: red;
  font-size: 1.5rem;
`;
const ValidContainer = styled.div`
  align-items: center;
  margin-left: 1rem;
  height: 2rem;
  display: flex;
  color: red;
  font-size: 0.8rem;
  ${(props) =>
    props.isValid &&
    css`
      color: blue;
    `}
`;
const Wrapper = styled.div`
  display: flex;
`;
const SelectBox = styled.select`
  width: 3.5rem;
  height: 2.3rem;
  border-radius: 5px;
  text-align: center;
  margin-right: 1rem;
  ${(props) =>
    props.mr &&
    css`
      margin-right: ${props.mr};
    `}
`;

const InnerContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 7fr;
  margin-bottom: 3rem;
`;

const ProfileImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    border-radius: 100px;
    width: 5rem;
    height: 5rem;
    margin-bottom: 1rem;
  }
`;
const Desc = styled.div`
  font-size: 1.8rem;
  margin: 3rem 0;
  font-weight: 600;
`;

const ModifyContainer = styled.div`
  display: flex;
  padding-right: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const InputContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const Type = styled.div`
  width: 8rem;
  height: 2rem;
  display: flex;
  align-items: center;
  ${(props) =>
    props.small &&
    css`
      width: 4rem;
    `}
`;

const ModifyProfile = () => {
  const [isPostCodeOpen, setIsPostCodeOpen] = useState(false);
  const [fullAddress, setFullAddress] = useState("주소를 입력해주세요");
  const { userId, userName } = useSelector((state) => state.user);

  // USER INFO STATE
  const [inputs, setInputs] = useState({
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
    validPassword: false,
    equelPassword: false,
    validEmail: false,
  });
  // VALIDATION END

  // ERROR MSG STATE
  const [errors, setErrors] = useState({
    passwordErrMsg: "",
    equelPasswordErrMsg: "",
    emailErrMsg: "",
  });
  // ERROR MSG END

  const {
    password,
    phoneNumber,
    parentPhoneNumber,
    email,
    addressDetail,
    gradeCode,
    classCode,
    studentNo,
  } = inputs;

  const { validPassword, equelPassword, validEmail } = valids;

  const { passwordErrMsg, equelPasswordErrMsg, emailErrMsg } = errors;

  useEffect(() => {
    getUser(userId).then((response) => {
      const data = response.data;
      console.log(data);
      setInputs({
        ...inputs,
        email: data.userEmail,
        phoneNumber: data.phone,
      });
      setFullAddress(data.address);
    });
  }, []);
  const openPostCode = () => {
    setIsPostCodeOpen(true);
  };

  const closePostCode = () => {
    setIsPostCodeOpen(false);
  };

  const onChange = (e) => {
    validationCheck(e, inputs, setInputs, valids, setValids, errors, setErrors);
  };

  const onSubmit = async () => {
    if (
      validEmail &&
      validPassword &&
      equelPassword &&
      gradeCode &&
      classCode &&
      studentNo
    ) {
      console.log(inputs);
      //   try {
      //     const user = {
      //       loginId: userId,
      //       password: password,
      //       address: fullAddress + " " + addressDetail,
      //       phone: phoneNumber,
      //       parentPhone: parentPhoneNumber,
      //       userEmail: email,
      //       userName: userName,
      //       gradeCode: gradeCode,
      //       classCode: classCode,
      //       studentNo: studentNo,
      //     };

      //     signUp(user).then((res) => {
      //       if (res.status === 201) {
      //         alert("회원가입에 성공하였습니다.");
      //         Navigate("/signin");
      //       }
      //     });
      //   } catch (e) {}
      // } else {
      //   alert("필수 입력 항목을 확인해주세요.");
      // }
    }
    // 회원가입 요청 END
  };
  return (
    <>
      {isPostCodeOpen && (
        <NewWindow title="주소찾기" onUnload={closePostCode}>
          <PostCode setFullAddress={setFullAddress} onClose={closePostCode} />
        </NewWindow>
      )}

      <FormContainer>
        <Desc>프로필 수정</Desc>

        {/* <InnerContainer> */}
        {/* <ProfileImageContainer>
            <img src={blankProfile} alt="blank-profile"></img>
            <Button width="6rem" name="파일 찾기" />
          </ProfileImageContainer> */}
        <ModifyContainer>
          <InputContainer>
            <Type>
              <div>이름</div>
              <Star>*</Star>
            </Type>
            <Type>{userName}</Type>
          </InputContainer>

          <InputContainer>
            <Type>
              <div>비밀번호</div>
              <Star>*</Star>
            </Type>
            <Input
              name="password"
              onChange={onChange}
              value={password}
              type="password"
              height="2rem"
              width="12rem"
            />
            <ValidContainer isValid={validPassword}>
              <div>{passwordErrMsg}</div>
            </ValidContainer>
          </InputContainer>
          <InputContainer>
            <Type>
              <div>비밀번호 확인</div>
              <Star>*</Star>
            </Type>
            <Input
              name="passwordConfirm"
              onChange={onChange}
              type="password"
              height="2rem"
              width="12rem"
            />
            <ValidContainer isValid={equelPassword}>
              <div>{equelPasswordErrMsg}</div>
            </ValidContainer>
          </InputContainer>

          <InputContainer>
            <Type>
              <div>전화번호</div>
            </Type>
            <Input
              name="phoneNumber"
              value={phoneNumber}
              onChange={onChange}
              placeholder="숫자만 입력하세요."
              height="2rem"
              width="12rem"
              mr="1rem"
            />
            <Type>
              <div>보호자 전화번호</div>
            </Type>
            <Input
              name="parentPhoneNumber"
              value={parentPhoneNumber}
              onChange={onChange}
              height="2rem"
              width="12rem"
              ml="2rem"
            />
          </InputContainer>

          <InputContainer>
            <Type>
              <div>이메일</div>
              <Star>*</Star>
            </Type>
            <Input
              name="email"
              onChange={onChange}
              value={email}
              height="2rem"
              width="12rem"
            />
            <ValidContainer isValid={validEmail}>
              <div>{emailErrMsg}</div>
            </ValidContainer>
          </InputContainer>

          <InputContainer>
            <Type>
              <div>주소</div>
            </Type>
            {fullAddress && (
              <Input
                mr="1rem"
                height="2rem"
                width="25rem"
                value={fullAddress}
                readOnly
              />
            )}
            <Button
              width={fullAddress ? "8rem" : "12rem"}
              name="도로명 주소 찾기"
              height="2.1rem"
              onClick={openPostCode}
            />
          </InputContainer>

          <InputContainer>
            <Type>
              <div>상세 주소</div>
            </Type>
            <Input
              onChange={onChange}
              name="addressDetail"
              height="2rem"
              width="25rem"
            />
          </InputContainer>

          {/*---------------------------------------------------------------------------------------------*/}
          {/*---------------------------------------------------------------------------------------------*/}
          {/* 학년 반 번호 일단 주석 */}
          {/* <InputContainer>
                <Wrapper>
                  <Type>
                    <div>학년</div>
                    <Star>*</Star>
                  </Type>
                  <SelectBox onChange={onGradeCodeSelect} name="gradeCode">
                    <option value={""}>선택</option>
                    {gradeCodeList.map((gradeCode) => (
                      <option key={gradeCode}>{gradeCode}</option>
                    ))}
                  </SelectBox>
                </Wrapper>

                <Wrapper>
                  <Type small="true">
                    <div>반</div>
                    <Star>*</Star>
                  </Type>
                  <SelectBox onChange={onGradeCodeSelect} name="classCode">
                    <option value={""}>선택</option>
                    {classCodeList.map((classCode) => (
                      <option key={classCode} value={classCode}>
                        {classCode}
                      </option>
                    ))}
                  </SelectBox>
                </Wrapper>

                <Wrapper>
                  <Type small="true">
                    <div>번호</div>
                    <Star>*</Star>
                  </Type>
                  <Input
                    name="studentNo"
                    value={studentNo}
                    onChange={onChange}
                    width="3rem"
                    mr="3rem"
                    height="2rem"
                  />
                </Wrapper>
              </InputContainer> */}
          {/*---------------------------------------------------------------------------------------------*/}
          {/*---------------------------------------------------------------------------------------------*/}
          {/* <Button
              mt="3rem"
              mr="1rem"
              width="10rem"
              height="3rem"
              name="가입 신청"
              onClick={onSubmit}
            />
            <Button
              color="#C4C4C4"
              mb="4rem"
              width="10rem"
              height="3rem"
              name="취소"
              hoverColor="#a2a2a2"
            /> */}
        </ModifyContainer>
        {/* </InnerContainer> */}
        <InputContainer>
          <Button
            mt="3rem"
            mr="1rem"
            width="10rem"
            height="3rem"
            name="수정하기"
            onClick={onSubmit}
          />
          <Button
            mt="3rem"
            color="#C4C4C4"
            width="10rem"
            height="3rem"
            name="취소"
            hoverColor="#a2a2a2"
          />
        </InputContainer>
      </FormContainer>
    </>
  );
};
export default ModifyProfile;
