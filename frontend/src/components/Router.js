import React from "react";
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

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/signin" />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/modifyprofile" element={<ModifyProfile />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/school" element={<School />} />
        <Route path="/lookup" element={<LookUp />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
