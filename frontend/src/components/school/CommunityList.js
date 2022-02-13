import { getCommunityList, getCommunityTotalCount } from "api/community";
import Button from "components/commons/button";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CommunityItem from "./CommunityItem";
import Pagination from "react-js-pagination";
import "assets/css/paging.css";

const Container = styled.div`
  width: 100%;
  padding: 1rem 5rem;
  box-sizing: border-box;
  height: 80%;
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

const PageContainer = styled.div`
  margin-top: 1rem;
`;

const CommunityList = () => {
  const Navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [isTotalItemsCountLoading, setIsTotalItemsCountLoading] =
    useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (isTotalItemsCountLoading) {
      getCommunityTotalCount().then((res) => {
        setTotalItemsCount(res.data.totalCommunity);
        setIsTotalItemsCountLoading(false);
      });
    } else {
      setIsLoading(true);
    }
  }, [isTotalItemsCountLoading]);

  // useEffect 데이터 read
  useEffect(() => {
    // console.log("community 리스트 조회");
    if (isLoading) {
      getCommunityList(page).then((res) => {
        setData(res.data.communityGetListResponseDtoList);
        setIsLoading(false);
      });
    }
    // console.log(data);
  }, [isLoading]);

  const handlePageChange = (page) => {
    setPage(page);
    Navigate(`?page=${page}`);
    setIsLoading(true);
  };

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
            <StyledCol width="7%"></StyledCol>
            <StyledCol width="58%"></StyledCol>
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
            {!isTotalItemsCountLoading &&
              !isLoading &&
              data &&
              data.map((item, idx) => (
                <CommunityItem
                  index={totalItemsCount - (page - 1) * 10 - idx - 1}
                  key={item.communityId}
                  data={item}
                />
              ))}
          </tbody>
        </StyledTable>
      </Container>
      <PageContainer>
        <Pagination
          activePage={page}
          itemsCountPerPage={10}
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={handlePageChange}
        />
      </PageContainer>
    </>
  );
};

export default CommunityList;
