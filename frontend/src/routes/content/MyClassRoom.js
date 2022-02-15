import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import MemberList from "components/classroom/MemberList";
import { getMyClass } from "api/myclass";
import { errorAlert } from "modules/alert";
import { logout } from "modules/user";

const Container = styled.div`
  box-sizing: border-box;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5rem;
  background-color: ${({ theme }) => theme.ContainerColor};
  min-height: 85vh;
`;

const Title = styled.div`
  font-size: 1.8rem;
  margin: 3rem 0;
  font-weight: 600;
`;

const InnerContainer = styled.div`
  width: 100%;
  margin-bottom: 3rem;
`;

const Desc = styled.div`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.menuColor};
`;

const MyClassRoom = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getMyClass()
      .then((response) => {
        setData(response.data.myClassGetListResponseDtoList);
      })
      .catch((e) => {
        if (e.response.status === 401) {
          errorAlert(401);
          dispatch(logout());
        } else {
          errorAlert(e.response.status, "우리반 정보를 불러오지 못했습니다.");
        }
      });
  }, []);
  return (
    <Container>
      <Title>우리 반 보기</Title>
      <Desc>
        우리 반 선생님과 친구들을 확인할 수 있습니다. 말풍선 아이콘을 클릭하여
        채팅을 시작해 보세요.
      </Desc>
      <InnerContainer>
        <MemberList data={data} />
      </InnerContainer>
    </Container>
  );
};

export default MyClassRoom;
