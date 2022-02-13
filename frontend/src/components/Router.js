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
import Notice from "routes/content/Notice";
import School from "routes/content/School";
import Meeting from "routes/content/Meeting";
import MyClassRoom from "routes/content/MyClassRoom";
import WidgetList from "routes/content/WidgetList";
import HomeSetting from "routes/HomeSetting";
import CommunityRegister from "./school/CommunityRegister";
import CommunityList from "./school/CommunityList";
import CommunityDetail from "./school/CommunityDetail";
import OnlineClass from "routes/OnlineClass";
import NoticeRegister from "./notice/NoticeRegister";
import NoticeList from "./notice/NoticeList";
import NoticeDetail from "./notice/NoticeDetail";
import Widget from "routes/content/Widget";
import HomeOther from "routes/HomeOther";
import ModifyPassword from "routes/auth/ModifyPassword";

const AppRouter = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  return (
    <Router>
      {isLoggedIn ? (
        <>
          <Routes>
            <Route path="/onlineclass/*" element={<OnlineClass />}>
              <Route path=":roomid" element={<OnlineClass />} />
            </Route>
            <Route path="/setting" element={<HomeOther />}>
              <Route path="home" element={<HomeSetting />} />
            </Route>
            <Route path="/" element={<Home />}>
              <Route path="home" element={<Widget />} />
              <Route path="modifyprofile" element={<ModifyProfile />} />
              <Route path="notice" element={<Notice />}>
                <Route path="" element={<NoticeList />} />
                <Route path="register" element={<NoticeRegister />} />
                <Route path=":noticeId" element={<NoticeDetail />} />
                <Route
                  path="modify/:noticeId"
                  element={<NoticeRegister modify />}
                />
              </Route>
              <Route path="school/" element={<School />}>
                <Route path="" element={<CommunityList />} />
                <Route path="register" element={<CommunityRegister />} />
                <Route path=":communityId" element={<CommunityDetail />} />
                <Route
                  path="modify/:communityId"
                  element={<CommunityRegister modify />}
                />
              </Route>
              <Route path="myclassroom" element={<MyClassRoom />} />
              <Route path="widgetlist" element={<WidgetList />} />
              <Route path="meeting" element={<Meeting />} />
            </Route>
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="/signin" element={<Navigate replace to="/home" />} />
            <Route path="/signup" element={<Navigate replace to="/home" />} />
          </Routes>
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
