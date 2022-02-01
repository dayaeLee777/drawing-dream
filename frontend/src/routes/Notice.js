import React from "react";
import styled from "styled-components";

const Container = styled.div`
  box-sizing: border-box;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5rem;
  background-color: ${({ theme }) => theme.widgetColor};
`;

const Desc = styled.div`
  font-size: 1.8rem;
  margin: 3rem 0;
  font-weight: 600;
`;

const InnerContainer = styled.div`
  width: 100%;
  margin-bottom: 3rem;
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

const Notice = () => {
  return (
    <>
      <Container>
        <Desc>알림장</Desc>
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
              <Type>2학년</Type>
              <TitleType>기말고사 일정 안내</TitleType>
              <Type>이다예</Type>
              <Type>2021.09.22</Type>
            </InputContainer>

            <InputContainer>
              <Type>6</Type>
              <Type>2학년 6반</Type>
              <TitleType>9월 21일 종례</TitleType>
              <Type>이지은</Type>
              <Type>2021.09.21</Type>
            </InputContainer>

            <InputContainer>
              <Type>5</Type>
              <Type>2학년 6반</Type>
              <TitleType>9월 21일 조례</TitleType>
              <Type>이지은</Type>
              <Type>2021.09.21</Type>
            </InputContainer>

            <InputContainer>
              <Type>4</Type>
              <Type>전체</Type>
              <TitleType>개교기념일 기념 행사</TitleType>
              <Type>장준범</Type>
              <Type>2021.09.20</Type>
            </InputContainer>

            <InputContainer>
              <Type>3</Type>
              <Type>전체</Type>
              <TitleType>급식실 보수 공사</TitleType>
              <Type>손창현</Type>
              <Type>2021.09.17</Type>
            </InputContainer>

            <InputContainer>
              <Type>3</Type>
              <Type>전체</Type>
              <TitleType>급식실 보수 공사</TitleType>
              <Type>손창현</Type>
              <Type>2021.09.17</Type>
            </InputContainer>

            <InputContainer>
              <Type>3</Type>
              <Type>전체</Type>
              <TitleType>급식실 보수 공사</TitleType>
              <Type>손창현</Type>
              <Type>2021.09.17</Type>
            </InputContainer>

            <InputContainer>
              <Type>3</Type>
              <Type>전체</Type>
              <TitleType>급식실 보수 공사</TitleType>
              <Type>손창현</Type>
              <Type>2021.09.17</Type>
            </InputContainer>
          </NoticeContainer>
        </InnerContainer>
      </Container>
    </>
  );
};

export default Notice;
