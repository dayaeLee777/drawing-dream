import Button from "components/commons/button";
import Input from "components/commons/input";
import React from "react";
import styled from "styled-components";
import Nav from "components/layout/Nav";
import Profile from "components/layout/Profile";
import SideMenu from "components/layout/SideMenu";

const Container = styled.div`
  margin: 0 10vw;
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 1fr 3fr;
`;

const SideWrapper = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-rows: 0fr 2fr;
`;

const FormContainer = styled.div`
  box-sizing: border-box;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5rem;
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

const Type = styled.div`
  text-align: right;
  width: 7rem;
  padding-right: 2rem;
`;

const Notice = () => {
  return (
    <>
      <Nav />
      <Container>
        <SideWrapper>
          <Profile />
          <SideMenu />
        </SideWrapper>
        <FormContainer>
          <Desc>제목</Desc>
          <InnerContainer>
            
          </InnerContainer>
        </FormContainer>
      </Container>
    </>
  );
};

export default Notice;