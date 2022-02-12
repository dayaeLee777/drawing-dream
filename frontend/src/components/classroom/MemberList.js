import React from "react";
import styled from "styled-components";
import Member from "components/classroom/Member";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin: 2rem 4rem;
  grid-gap: 2rem;
`;
const MemberList = ({ data }) => {
  return (
    <Container>
      {data.map((member, index) => (
        <Member key={index} member={member} />
      ))}
    </Container>
  );
};

export default MemberList;
