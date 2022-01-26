import Button from "components/commons/button";
import React from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  box-sizing: border-box;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5rem;

  button {
    margin-left: auto;
    border-radius: 10px;
  }
`;

const Desc = styled.div`
  font-size: 1.8rem;
  margin: 3rem 0;
  font-weight: 600;
`;

const InnerContainer = styled.div`
  width: 100%;
  margin: 3rem;
`;

const Line = styled.div`
  margin: auto;
  width: 80%;
  border: 0;
  height: 1px;
  background: #333;
  background-image: linear-gradient(to right, #ccc, #333, #ccc);
`;

const NoticeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3rem 0;
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 4fr 1fr 3fr;
  margin-bottom: 1.5rem;
`;

const Subject = styled.div`
  text-align: center;
  font-weight: bold;
  padding-left: 5rem;
  width: 5rem;
  margin-bottom: 2rem;
`;

const TitleSubject = styled.div`
  text-align: center;
  font-weight: bold;
  padding-left: 5rem;
  width: 17rem;
  margin-bottom: 2rem;
`;

const Type = styled.div`
  text-align: center;
  padding-left: 5rem;
  width: 5rem;
  margin-bottom: 2rem;
`;

const TitleType = styled.div`
  text-align: center;
  font-weight: bold;
  padding-left: 5rem;
  width: 17rem;
  margin-bottom: 2rem;
`;

const School = () => {
  return (
    <>
      <FormContainer>
        <Desc>우리 학교 커뮤니티</Desc>
        <InnerContainer>
          <Line />
          <NoticeContainer>
            <InputContainer>
              <Subject>번호</Subject>
              <Subject>분류</Subject>
              <TitleSubject>제목</TitleSubject>
              <Subject>작성자</Subject>
              <Subject>등록일자</Subject>
            </InputContainer>

            <InputContainer>
              <Type>7</Type>
              <Type>유머</Type>
              <TitleType>명란젓 코난</TitleType>
              <Type>이다예</Type>
              <Type>2021.09.22</Type>
            </InputContainer>

            <InputContainer>
              <Type>6</Type>
              <Type>정보</Type>
              <TitleType>이것만 보면 수학 100점</TitleType>
              <Type>이지은</Type>
              <Type>2021.09.21</Type>
            </InputContainer>

            <InputContainer>
              <Type>5</Type>
              <Type>자유</Type>
              <TitleType>이거 보고 안 들어오면 3대가 탈모</TitleType>
              <Type>이지은</Type>
              <Type>2021.09.21</Type>
            </InputContainer>

            <InputContainer>
              <Type>4</Type>
              <Type>고민</Type>
              <TitleType>오늘 학교를 못 갔는데 어떻게 처리를..</TitleType>
              <Type>장준범</Type>
              <Type>2021.09.20</Type>
            </InputContainer>

            <InputContainer>
              <Type>3</Type>
              <Type>질문</Type>
              <TitleType>이거 어떻게 푸나요?</TitleType>
              <Type>손창현</Type>
              <Type>2021.09.17</Type>
            </InputContainer>
          </NoticeContainer>
        </InnerContainer>
        <Button name="글쓰기" mr="5rem" mb="5rem" width="17rem" height="3rem" />
      </FormContainer>
    </>
  );
};

export default School;
