import commonCode from "config/commonCode";
import React from "react";
import styled from "styled-components";

const Contanier = styled.div`
  border: 4px solid #f5bd5c;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 1rem 3rem;
  margin: 0 1.5rem;

  .preiod {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }

  .name {
    font-size: 3rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }
`;
const InfoContainer = styled.div`
  display: flex;
  font-size: 1.25rem;
  .desc {
    width: 8rem;
    font-weight: 600;
  }
  .content {
  }
  margin-bottom: 0.75rem;
`;

const CourseInfoDetail = ({ data }) => {
  const preiodCode = data.periodCode;
  const courseCode = data.courseCode;
  return (
    <Contanier>
      <div className="preiod">
        {commonCode[preiodCode.substr(0, 1)][preiodCode]}
      </div>
      <div className="name">
        {
          commonCode[courseCode.substr(0, 1)][courseCode.substr(0, 3)][
            courseCode
          ]
        }
      </div>
      <InfoContainer>
        <div className="desc">교사명</div>
        <div className="content">김싸피</div>
      </InfoContainer>
      <InfoContainer>
        <div className="desc">수업 시간</div>
        <div className="content">9:00 ~ 9:50</div>
      </InfoContainer>
      <InfoContainer>
        <div className="desc">수업 자료</div>
        <div className="content">2020진로탐색</div>
      </InfoContainer>
      <InfoContainer>
        <div className="desc">다시 보기</div>
        <div className="content">수업 완료 후 확인할 수 있어요</div>
      </InfoContainer>
    </Contanier>
  );
};

export default CourseInfoDetail;
