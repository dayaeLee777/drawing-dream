import React, { useState } from "react";
import styled from "styled-components";
import CommunityRegister from "components/school/CommunityRegister";
import CommunityList from "components/school/CommunityList";
import CommunityDetail from "components/school/CommunityDetail";

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.widgetColor};
`;

const School = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [communityId, setCommunityId] = useState("");

  if (isRegister) {
    return (
      <Container>
        <CommunityRegister setIsRegister={setIsRegister} />
      </Container>
    )
  } else if (communityId) {
    return (
      <Container>
        <CommunityDetail setCommunityId={setCommunityId} />
      </Container>
    )
  } else {
    return (
      <Container>
        <CommunityList setIsRegister={setIsRegister} setCommunityId={setCommunityId}/>
      </Container>
    )
  }
};

export default School;
