import Widgets from "components/home/Widgets";
import { readTimeTable } from "modules/timetable";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(readTimeTable());
  }, []);
  return (
    <>
      <Widgets />
    </>
  );
};

export default Home;
