import React from "react";
import SideMenuItem from "./side/SideMenuItem";
import styled from "styled-components";
import house from "assets/house.png";
import book from "assets/green-book.png";
import star from "assets/star.png";
import teacher from "assets/teacher.png";
import school from "assets/school.png";

const Container = styled.div`
  margin-top: 1rem;
`;

const SideMenu = () => {
  return (
    <Container>
      <SideMenuItem path={house} name="홈" />
      <SideMenuItem path={book} name="알림장" />
      <SideMenuItem path={star} name="모아보기" />
      <SideMenuItem path={teacher} name="우리 반 보기" />
      <SideMenuItem path={school} name="우리 학교 보기" />
    </Container>
  );
};

export default SideMenu;
