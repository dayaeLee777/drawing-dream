import Button from "components/commons/button";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CommunityItem from "./NoticeItem";
import Pagination from "react-js-pagination";
import "assets/css/paging.css";
import { getNoticeList, getNoticeTotalCount } from "api/notice";
import { useSelector } from "react-redux";

const Container = styled.div`
  width: 100%;
  padding: 1rem 5rem;
  box-sizing: border-box;
  height: 80%;
`;

const Title = styled.div`
  font-size: 1.8rem;
  margin-top: 3rem;
  font-weight: 600;
`;

const Desc = styled.div`
  margin-top: 3rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.menuColor};
`;

const StyledTable = styled.table`
  width: 100%;
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
  color: black;

  & + & {
    border-left: 2px solid white;
  }
`;

const PageContainer = styled.div`
  margin-top: 1rem;
`;

const NoticeList = () => {
  const Navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [isTotalItemsCountLoading, setIsTotalItemsCountLoading] =
    useState(true);
  const [page, setPage] = useState(0);
  const { userCode } = useSelector((state) => state.user);

  useEffect(() => {
    if (isTotalItemsCountLoading) {
      getNoticeTotalCount().then((res) => {
        setTotalItemsCount(res.data.totalNoticeCount);
        setIsTotalItemsCountLoading(false);
      });
    } else {
      setIsLoading(true);
    }
  }, [isTotalItemsCountLoading]);

  // useEffect 데이터 read
  useEffect(() => {
    if (isLoading) {
      getNoticeList(page).then((res) => {
        setData(res.data);
        setIsLoading(false);
      });
    }
  }, [isLoading]);

  const handlePageChange = (page) => {
    setPage(page - 1);
    Navigate(`?page=${page}`);
    setIsLoading(true);
  };

  return (
    <>
      <Title>알림장</Title>
      <Desc>공지사항과 조례, 종례 내용을 확인하실 수 있습니다.</Desc>
      <Container>
        <ButtonContainer>
          {userCode !== "A04" && (
            <Button
              name="글쓰기"
              width="7rem"
              height="2rem"
              onClick={() => Navigate("./register")}
            />
          )}
        </ButtonContainer>
        <StyledTable>
          <colgroup>
            <StyledCol width="7%"></StyledCol>
            <StyledCol width="15%"></StyledCol>
            <StyledCol width="42%"></StyledCol>
            <StyledCol width="13%"></StyledCol>
            <StyledCol width="7%"></StyledCol>
            <StyledCol width="16%"></StyledCol>
          </colgroup>
          <thead>
            <tr>
              <StyledTh>글번호</StyledTh>
              <StyledTh>구분</StyledTh>
              <StyledTh>제목</StyledTh>
              <StyledTh>작성자</StyledTh>
              <StyledTh>조회수</StyledTh>
              <StyledTh>등록일</StyledTh>
            </tr>
          </thead>
          <tbody>
            {data &&
              !isLoading &&
              data.map((item, idx) => (
                <CommunityItem
                  index={totalItemsCount - page * 10 - idx - 1}
                  key={item.noticeId}
                  data={item}
                />
              ))}
          </tbody>
        </StyledTable>
      </Container>
      <PageContainer>
        <Pagination
          activePage={page + 1}
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

export default NoticeList;
