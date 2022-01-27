import Button from "components/commons/button";
import Input from "components/commons/input";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import blankProfile from "assets/img/blank-profile.png";
import NewWindow from "react-new-window";
import PostCode from "components/signup/postcode/FindPostCode";
import { getUser, idCheck } from "api/user";
import { useSelector } from "react-redux";

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

  // 유효성 검사
  const onChange = (e) => {
    let { value, name } = e.target;
    // console.log(value);

    if (name === "userId") {
      const regType1 = /^[a-z0-9+]*$/;
      if (value.length < 6) {
        setValids({
          ...valids,
          validId: false,
        });
        setErrors({
          ...errors,
          idErrMsg: "6자리 이상 입력해주세요.",
        });
      } else if (!regType1.test(value)) {
        setValids({
          ...valids,
          validId: false,
        });
        setErrors({
          ...errors,
          idErrMsg: "알파벳 소문자와 숫자만 사용가능합니다.",
        });
      }
      // id 중복 검사
      else if (value.length >= 6) {
        idCheck(value).then((res) => {
          if (res.data.statusCode === 200) {
            setValids({
              ...valids,
              validId: false,
            });
            setErrors({
              ...errors,
              idErrMsg: "이미 사용중인 아이디입니다.",
            });
          } else if (res.data.statusCode === 409) {
            setValids({
              ...valids,
              validId: true,
            });
            setErrors({
              ...errors,
              idErrMsg: "사용가능한 아이디입니다.",
            });
          }
        });
      }
    } else if (name === "userName") {
      const regExp = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
      const regExp2 = /[ㄱ-ㅎㅏ-ㅣ]/g;

      if (!regExp.test(value) || regExp2.test(value)) {
        setValids({
          ...valids,
          validName: false,
        });
        setErrors({
          ...errors,
          nameErrMsg: "이름을 정확히 입력해 주세요.",
        });
      } else {
        setValids({
          ...valids,
          validName: true,
        });
        setErrors({
          ...errors,
          nameErrMsg: "",
        });
      }
    } else if (name === "password") {
      if (value.length < 8) {
        setValids({
          ...valids,
          validPassword: false,
        });
        setErrors({
          ...errors,
          passwordErrMsg: "8자리 이상 입력하세요.",
        });
      } else if (value.length > 20) {
        setValids({
          ...valids,
          validPassword: false,
        });
        setErrors({
          ...errors,
          passwordErrMsg: "20자리 이하로 입력하세요.",
        });
      } else {
        setValids({
          ...valids,
          validPassword: true,
        });
        setErrors({
          ...errors,
          passwordErrMsg: "",
        });
      }
      const regExp = /\s/gi;
      value = value.replace(regExp, "");
    } else if (name === "passwordConfirm") {
      if (password === value) {
        setValids({
          ...valids,
          equelPassword: true,
        });
        setErrors({
          ...errors,
          equelPasswordErrMsg: "",
        });
      } else {
        setValids({
          ...valids,
          equelPassword: false,
        });
        setErrors({
          ...errors,
          equelPasswordErrMsg: "비밀번호가 일치하지 않습니다.",
        });
      }
    } else if (name === "phoneNumber" || name === "parentPhoneNumber") {
      const regType1 = /[^0-9]/;
      value = value.replace(regType1, "");
    } else if (name === "email") {
      const regExp =
        /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
      if (regExp.test(value)) {
        setValids({
          ...valids,
          validEmail: true,
        });
        setErrors({
          ...errors,
          emailErrMsg: "",
        });
      } else {
        setValids({
          ...valids,
          validEmail: false,
        });
        setErrors({
          ...errors,
          emailErrMsg: "이메일형식이 올바르지 않습니다.",
        });
      }
    } else if (name === "studentNo") {
      const regType1 = /[^0-9]/;
      value = value.replace(regType1, "");
    }
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  // 유효성 검사 END
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
