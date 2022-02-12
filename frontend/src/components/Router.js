import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import ModifyProfile from "routes/auth/ModifyProfile";
import SignIn from "routes/auth/SignIn";
import SignUp from "routes/auth/SignUp";
import Home from "routes/Home";
import Notice from "routes/Notice";
import School from "routes/School";
import Meeting from "routes/Meeting";
import Layout from "components/layout/SideLayout";
import Nav from "components/layout/Nav";
import styled from "styled-components";
import Chat from "./chat/Chat";
import MyClassRoom from "routes/MyClassRoom";
import WidgetList from "routes/WidgetList";
import HomeSetting from "routes/HomeSetting";
import CommunityRegister from "./school/CommunityRegister";
import CommunityList from "./school/CommunityList";
import CommunityDetail from "./school/CommunityDetail";
import OnlineClass from "routes/OnlineClass";
import NoticeRegister from "./notice/NoticeRegister";
import NoticeList from "./notice/NoticeList";
import NoticeDetail from "./notice/NoticeDetail";

const Container = styled.div`
  display: grid;
  grid-template-columns: 0fr 2fr;
  grid-gap: 2rem;
  margin: 0 10vw;
`;

const AppRouter = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  return (
    <Router>
      {isLoggedIn ? (
        <>
          <Nav />
          {window.location.pathname === "/setting/home" ||
          window.location.href.indexOf("onlineclass") > 1 ? (
            <>
              <Routes>
                <Route path="/setting/home" element={<HomeSetting />} />
                <Route path="/onlineclass/*" element={<OnlineClass />}>
                  <Route path=":roomid" element={<OnlineClass />} />
                </Route>
              </Routes>
            </>
          ) : (
            <>
              <Container>
                <Layout />
                <Routes>
                  <Route path="/" element={<Navigate replace to="/home" />} />
                  <Route
                    path="/signin"
                    element={<Navigate replace to="/home" />}
                  />
                  <Route
                    path="/signup"
                    element={<Navigate replace to="/home" />}
                  />
                  <Route path="/home" element={<Home />} />
                  <Route path="/modifyprofile" element={<ModifyProfile />} />
                  <Route path="/notice" element={<Notice />}>
                    <Route path="" element={<NoticeList />} />
                    <Route path="register" element={<NoticeRegister />} />
                    <Route path=":noticeId" element={<NoticeDetail />} />
                    <Route
                      path="modify/:noticeId"
                      element={<NoticeRegister modify />}
                    />
                  </Route>
                  <Route path="/school/" element={<School />}>
                    <Route path="" element={<CommunityList />} />
                    <Route path="register" element={<CommunityRegister />} />
                    <Route path=":communityId" element={<CommunityDetail />} />
                    <Route
                      path="modify/:communityId"
                      element={<CommunityRegister modify />}
                    />
                  </Route>
                  <Route path="/meeting" element={<Meeting />} />
                  <Route path="/myclassroom" element={<MyClassRoom />} />
                  <Route path="/widgetlist" element={<WidgetList />} />
                </Routes>
              </Container>
              <Chat />
            </>
          )}
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Navigate replace to="/signin" />} />
            <Route path="/signin" exact element={<SignIn />} />
            <Route path="/signup" exact element={<SignUp />} />
            <Route path="/*" element={<Navigate replace to="/signin" />} />
          </Routes>
        </>
      )}
    </Router>
  );
};

export default AppRouter;
