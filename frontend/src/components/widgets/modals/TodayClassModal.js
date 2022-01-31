import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import LeftContainer from "../todayclass/LeftContainer";
import RightContainer from "../todayclass/RightContainer";

const Wrapper = styled(motion.div)`
  width: 1000px;
  height: 650px;
  padding: 2rem 3rem;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  background-color: white;
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  letter-spacing: -1px;
  box-sizing: border-box;
`;

const TodayClassModal = ({ layoutId }) => {
  /////////////testdata//////////////
  const data = [
    {
      dayCode: "H01",
      periodCode: "I01",
      subjectCode: "G0100",
    },
    {
      dayCode: "H01",
      periodCode: "I02",
      subjectCode: "G0200",
    },
    {
      dayCode: "H01",
      periodCode: "I03",
      subjectCode: "G0300",
    },
    {
      dayCode: "H01",
      periodCode: "I04",
      subjectCode: "G0400",
    },
    {
      dayCode: "H01",
      periodCode: "I05",
      subjectCode: "G0500",
    },
    {
      dayCode: "H01",
      periodCode: "I06",
      subjectCode: "G0600",
    },
    {
      dayCode: "H01",
      periodCode: "I07",
      subjectCode: "G0700",
    },
  ];

  const onClick = (event) => {
    event.stopPropagation();
  };

  return (
    <Wrapper onClick={onClick} layoutId={layoutId}>
      <LeftContainer data={data} />
      <RightContainer />
    </Wrapper>
  );
};

export default TodayClassModal;
