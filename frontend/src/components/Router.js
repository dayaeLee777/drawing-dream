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
import LookUp from "routes/LookUp";
import Layout from "components/layout/SideLayout";
import Nav from "components/layout/Nav";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 0fr 2fr;
  grid-gap: 2rem;
  margin: 0 10vw;
`;

const AppRouter = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  console.log(isLoggedIn);
  return (
    <Router>
      {isLoggedIn ? (
        <>
          <Nav />
          <Container>
            <Layout />
            <Routes>
              <Route path="/" element={<Navigate replace to="/home" />} />
              <Route path="/signin" element={<Navigate replace to="/home" />} />
              <Route path="/signup" element={<Navigate replace to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/modifyprofile" element={<ModifyProfile />} />
              <Route path="/notice" element={<Notice />} />
              <Route path="/school" element={<School />} />
              <Route path="/lookup" element={<LookUp />} />
            </Routes>
          </Container>
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
