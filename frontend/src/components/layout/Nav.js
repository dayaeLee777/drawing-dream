import React from "react";
import logo from "assets/img/logo.png";
import signOut from "assets/img/sign-out.png";
import cog from "assets/img/cog.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { darkTheme, ligthTheme } from "modules/theme";
import { logout } from "modules/user";

const Container = styled.div`
  display: flex;
  margin: 2rem 10vw;
  justify-content: space-between;
  width: 80vw;
`;

const Item = styled.div`
  width: 7rem;
  color: ${({ theme }) => theme.menuColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 5rem;
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.img`
  width: fit-content;
  height: fit-content;
  padding: 0.5rem;
`;

const DropDownContent = styled.div`
  display: none;
  position: absolute;
  background-color: ${({ theme }) => theme.dropdownColor};
  min-width: 10rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 10px;
  z-index: 1;
`;

const DropDown = styled.div`
  position: relative;
  display: inline-block;
  &:hover ${DropDownContent} {
    display: block;
  }
`;

const DropDownItem = styled.div`
  text-align: center;
  margin: 2rem;
`;

const Nav = () => {
  const { isDarkMode } = useSelector((state) => state.theme);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
  };
  return (
    <Container>
      <Item
        onClick={() => {
          navigate("/home");
        }}
      >
        <Logo src={logo}></Logo>
      </Item>
      <MenuWrapper>
        <DropDown>
          <Item>
            <Icon src={cog} />
            설정
          </Item>
          <DropDownContent>
            <DropDownItem
              onClick={() => {
                navigate("/setting/home");
              }}
            >
              홈 화면 설정
            </DropDownItem>
            <DropDownItem onClick={() => navigate("/modifyprofile")}>
              프로필 수정
            </DropDownItem>
            <DropDownItem onClick={() => navigate("/modifypassword")}>
              비밀번호 변경
            </DropDownItem>
            {isDarkMode ? (
              <DropDownItem onClick={() => dispatch(ligthTheme())}>
                다크모드 off
              </DropDownItem>
            ) : (
              <DropDownItem onClick={() => dispatch(darkTheme())}>
                다크모드 on
              </DropDownItem>
            )}
          </DropDownContent>
        </DropDown>

        <Item onClick={logoutUser}>
          <Icon src={signOut} />
          로그아웃
        </Item>
      </MenuWrapper>
    </Container>
  );
};

export default Nav;
