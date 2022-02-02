import Button from "components/commons/button";
import Input from "components/commons/input";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import blankProfile from "assets/img/blank-profile.png";
import PostCode from "components/signup/postcode/FindPostCode";
import { getUser } from "api/user";
import { useSelector } from "react-redux";
import validationCheck from "components/signup/validationCheck";
import commonCode from "config/commonCode";
import InputContainer from "components/commons/inputContainer";
import { ReactNewWindowStyles } from "react-new-window-styles";
import SchoolCode from "components/signup/school/SchoolCode";

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
const SelectBox = styled.select`
  width: 4rem;
  height: 2.3rem;
  border-radius: 5px;
  text-align: center;
  margin-right: 1rem;
`;
const InputBlock = styled.div`
  display: flex;
`;

const ModifyProfile = () => {
  const [isPostCodeOpen, setIsPostCodeOpen] = useState(false);
  const [isSchoolCodeOpen, setIsSchoolCodeOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fullAddress, setFullAddress] = useState("");
  const [newSchoolCode, setSchoolCode] = useState("");
  const [newSchoolName, setSchoolName] = useState("");
  const [inputs, setInputs] = useState();
  const state = useSelector((state) => state.user);

  useEffect(() => {
    if (isLoading) {
      getUser(state.userId).then(
        (res) => (
          console.log(res),
          console.log(state),
          setInputs({
            ...inputs,
            address: res.data.address,
            phoneNumber: res.data.phone,
            parentPhoneNumber: res.data.parentPhone,
            email: res.data.userEmail,
            userName: res.data.userName,
            gradeCode: state.gradeCode,
            classCode: state.classCode,
            studentNo: state.studentNo,
            schoolCode: state.schoolCode,
            schoolName: state.schoolName,
            addressDetail: "",
          }),
          setFullAddress(res.data.address),
          console.log(inputs),
          setIsLoading(false)
        )
      );
    }
  }, []);

  // VALIDATION STATE
  const [valids, setValids] = useState({
    validEmail: true,
  });
  // VALIDATION END

  // ERROR MSG STATE
  const [errors, setErrors] = useState({
    emailErrMsg: "",
  });
  // ERROR MSG END
  const { validEmail } = valids;
  const { emailErrMsg } = errors;

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
  const onChange = (e) => {
    validationCheck(e, inputs, setInputs, valids, setValids, errors, setErrors);
  };

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

  const onSubmit = async () => {
    if (
      validEmail
      // gradeCode &&
      // classCode &&
      // studentNo
    ) {
      console.log(inputs);
      //   try {
      //     const user = {
      //       loginId: userId,
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
      {/* <InnerContainer> */}
      {/* <ProfileImageContainer>
            <img src={blankProfile} alt="blank-profile"></img>
            <Button width="6rem" name="파일 찾기" />
          </ProfileImageContainer> */}
      {!isLoading && (
        <FormContainer>
          <Desc>프로필 수정</Desc>
          <ModifyContainer>
            <InputBlock>
              <Wrapper>
                <div className="desc">이름</div>
                <div className="desc">{inputs.userName}</div>
              </Wrapper>
            </InputBlock>
            <InputContainer
              desc="전화번호"
              onChange={onChange}
              name="phoneNumber"
              value={inputs.phoneNumber}
            />
            <InputContainer
              desc="보호자 전화번호"
              onChange={onChange}
              name="parentPhoneNumber"
              value={inputs.parentPhoneNumber}
            />
            <InputContainer
              desc="이메일"
              star
              onChange={onChange}
              name="email"
              isValid={validEmail}
              errMsg={emailErrMsg}
              value={inputs.email}
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
                  학년<div className="star">*</div>
                </div>
                <SelectBox
                  onChange={onGradeCodeSelect}
                  name="gradeCode"
                  defaultValue={inputs.gradeCode ? inputs.gradeCode : "default"}
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
                  defaultValue={inputs.classCode ? inputs.classCode : "default"}
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
                  value={inputs.studentNo}
                  onChange={onChange}
                  width="3rem"
                  height="2rem"
                />
              </Wrapper>
            </InputBlock>
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
            />
          </InputBlock>
        </FormContainer>
      )}
      {isPostCodeOpen && (
        <ReactNewWindowStyles
          title="주소찾기"
          onClose={closePostCode}
          windowProps={{ width: 580, height: 600 }}
        >
          <PostCode setFullAddress={setFullAddress} onClose={closePostCode} />
        </ReactNewWindowStyles>
      )}
    </>
  );
};
export default ModifyProfile;
