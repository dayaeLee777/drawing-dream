import Button from "components/commons/button";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import CommunityItem from "./CommunityItem";

const Container = styled.div`
  width: 100%;
  padding: 2rem 5rem;
  box-sizing: border-box;
`;

const Desc = styled.div`
  font-size: 1.8rem;
  margin-top: 3rem;
  font-weight: 600;
`;

const StyledTable = styled.table`
  width: 100%;
  /* border: 1px solid black; */
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  margin-bottom: 1rem;
`;

const StyledCol = styled.col`
  width: ${(props) => props.width};
`;

const StyledTh = styled.td`
  background-color: #fec25c;
  height: 2rem;
  vertical-align: middle;
  text-align: center;
  font-weight: 600;

  & + & {
    border-left: 2px solid white;
  }
`;

const CommunityList = ({setIsRegister, setCommunityId}) => {
  const sampleData = [
    {
      id: 1,
      regTime: "2022.02.04",
      hit: 23,
      title: "첫번째 글",
    },
    {
      id: 2,
      regTime: "2022.02.04",
      hit: 5,
      title: "두번째 글",
    },
    {
      id: 3,
      regTime: "2022.02.04",
      hit: 67,
      title: "세번째 글",
    },
    {
      id: 4,
      regTime: "2022.02.04",
      hit: 55,
      title: "네번째 글",
    },
  ];
  const onRegister = () => {
    setIsRegister(true);
  }

  return (
    <>
      <Desc>우리 학교 커뮤니티</Desc>
      <Container>
        <ButtonContainer>
          <Button name="글쓰기" width="7rem" height="2rem" onClick={onRegister}/>
        </ButtonContainer>
        <StyledTable>
          <colgroup>
            <StyledCol width="10%"></StyledCol>
            <StyledCol width="65%"></StyledCol>
            <StyledCol width="10%"></StyledCol>
            <StyledCol width="15%"></StyledCol>
          </colgroup>
          <thead>
            <tr>
              <StyledTh>글번호</StyledTh>
              <StyledTh>제목</StyledTh>
              <StyledTh>조회수</StyledTh>
              <StyledTh>등록일</StyledTh>
            </tr>
          </thead>
          <tbody>
            {sampleData.map((item) => (
              <CommunityItem key={item.id} data={item} setCommunityId={setCommunityId}/>
            ))}
          </tbody>
        </StyledTable>
      </Container>
    </>
  );
};

export default CommunityList;
