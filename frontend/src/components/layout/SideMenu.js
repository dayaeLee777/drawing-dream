import React from "react";
import SideMenuItem from "./side/SideMenuItem";
import styled from "styled-components";
import house from "assets/img/house.png";
import book from "assets/img/green-book.png";
import star from "assets/img/star.png";
import teacher from "assets/img/teacher.png";
import school from "assets/img/school.png";

const Container = styled.div``;

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
