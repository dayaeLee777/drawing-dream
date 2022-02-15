import React, { useEffect, useState } from "react";
import SideMenuItem from "./side/SideMenuItem";
import styled from "styled-components";
import house from "assets/img/house.png";
import book from "assets/img/green-book.png";
import star from "assets/img/star.png";
import teacher from "assets/img/teacher.png";
import school from "assets/img/school.png";
import { useLocation, useNavigate } from "react-router-dom";

const Container = styled.div``;

const SideMenu = () => {
  const location = useLocation();
  const [isSelected, setIsSelected] = useState("/home");
  const navigate = useNavigate();
  const onClick = (url) => {
    navigate(url);
    setIsSelected(url);
  };

  useEffect(() => {
    setIsSelected("/" + location.pathname.split("/")[1]);
  }, [location]);
  return (
    <Container>
      <SideMenuItem
        url="/home"
        path={house}
        name="홈"
        onClick={onClick}
        isSelected={isSelected}
      />
      <SideMenuItem
        url="/notice"
        path={book}
        name="알림장"
        onClick={onClick}
        isSelected={isSelected}
      />
      <SideMenuItem
        url="/widgetlist"
        path={star}
        name="모아보기"
        onClick={onClick}
        isSelected={isSelected}
      />
      <SideMenuItem
        url="/myclassroom"
        path={teacher}
        name="우리 반 보기"
        onClick={onClick}
        isSelected={isSelected}
      />
      <SideMenuItem
        url="/school"
        path={school}
        name="우리 학교 보기"
        onClick={onClick}
        isSelected={isSelected}
      />
    </Container>
  );
};

export default SideMenu;
