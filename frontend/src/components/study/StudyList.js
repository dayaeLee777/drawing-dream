import React from "react";
import styled from "styled-components";
import StudyItem from "./StudyItem";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin: 2rem 4rem;
  grid-gap: 2rem;
`;
const StudyList = () => {
  return <Container>{/* <StudyItem/> */}</Container>;
};

export default StudyList;
