import { getCommunityList } from "api/community";
import Button from "components/commons/button";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  height: 2.2rem;
  vertical-align: middle;
  text-align: center;
  font-weight: 600;
  border-radius: 3px;

  & + & {
    border-left: 2px solid white;
  }
`;

const CommunityList = () => {
  const Navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect 데이터 read
  useEffect(() => {
    // console.log("community 리스트 조회");
    if (isLoading) {
      getCommunityList().then((res) => {
        setData(res.data.communityGetListResponseDtoList);
        setIsLoading(false);
      });
    }
    // console.log(data);
  }, [isLoading]);

  // const sampleData = [
  //   {
  //     id: 1,
  //     regTime: "2022.02.04",
  //     userName: "이학생",
  //     hit: 23,
  //     title: "첫번째 글",
  //   },
  //   {
  //     id: 2,
  //     regTime: "2022.02.04",
  //     userName: "박학생",
  //     hit: 5,
  //     title: "두번째 글",
  //   },
  //   {
  //     id: 3,
  //     regTime: "2022.02.04",
  //     userName: "최학생",
  //     hit: 67,
  //     title: "세번째 글",
  //   },
  //   {
  //     id: 4,
  //     regTime: "2022.02.04",
  //     userName: "윤학생",
  //     hit: 55,
  //     title: "네번째 글",
  //   },
  //   {
  //     id: 5,
  //     regTime: "2022.02.04",
  //     userName: "김학생",
  //     hit: 55,
  //     title: "네번째 글",
  //   },
  //   {
  //     id: 6,
  //     regTime: "2022.02.04",
  //     userName: "정학생",
  //     hit: 55,
  //     title: "네번째 글",
  //   },
  //   {
  //     id: 7,
  //     regTime: "2022.02.04",
  //     userName: "이학생",
  //     hit: 55,
  //     title: "네번째 글",
  //   },
  //   {
  //     id: 8,
  //     regTime: "2022.02.04",
  //     userName: "장학생",
  //     hit: 55,
  //     title: "네번째 글",
  //   },
  //   {
  //     id: 9,
  //     regTime: "2022.02.04",
  //     userName: "박학생",
  //     hit: 55,
  //     title: "네번째 글",
  //   },
  //   {
  //     id: 10,
  //     regTime: "2022.02.04",
  //     userName: "손학생",
  //     hit: 55,
  //     title: "네번째 글",
  //   },
  // ];

  return (
    <>
      <Desc>우리 학교 커뮤니티</Desc>
      <Container>
        <ButtonContainer>
          <Button
            name="글쓰기"
            width="7rem"
            height="2rem"
            onClick={() => Navigate("./register")}
          />
        </ButtonContainer>
        <StyledTable>
          <colgroup>
            <StyledCol width="5%"></StyledCol>
            <StyledCol width="60%"></StyledCol>
            <StyledCol width="13%"></StyledCol>
            <StyledCol width="7%"></StyledCol>
            <StyledCol width="15%"></StyledCol>
          </colgroup>
          <thead>
            <tr>
              <StyledTh>글번호</StyledTh>
              <StyledTh>제목</StyledTh>
              <StyledTh>작성자</StyledTh>
              <StyledTh>조회수</StyledTh>
              <StyledTh>등록일</StyledTh>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item) => (
                <CommunityItem key={item.communityId} data={item} />
              ))}
          </tbody>
        </StyledTable>
      </Container>
    </>
  );
};

export default CommunityList;
