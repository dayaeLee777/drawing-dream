import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import commonCode from "config/commonCode";
import CheckList from "components/widgets/CheckList";
import Dday from "components/widgets/Dday";
import Memo from "components/widgets/Memo";
import TodayClass from "components/widgets/TodayClass";
import { useCookies } from "react-cookie";
import Score from "components/widgets/Score";
import StudyRecord from "components/widgets/StudyRecord";
import TimeTable from "components/widgets/TimeTable";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: grid;
  grid-template-columns: 0fr 2fr;
  grid-gap: 2rem;
  margin: 0 10vw;
  height: 80vh;
`;
const Wrapper = styled.div`
  width: 20rem;
`;
const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EditButton = styled.div`
  width: 6rem;
  height: 3rem;
  box-shadow: ${(props) =>
    props.name === "apply"
      ? "rgb(59, 178, 0, 0.16) 0px 1px 4px"
      : "rgb(255, 0, 0, 0.16) 0px 1px 4px"};
  margin: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) =>
    props.name === "apply" ? "rgb(59, 178, 0)" : "rgb(255, 0, 0)"};
  border-radius: 10px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.widgetColor};
`;

const OptionContainer = styled(motion.div)`
  height: 5rem;
  box-shadow: ${(props) =>
    props.selected
      ? "rgba(254, 194, 92, 1) 0px 1px 4px"
      : "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"};
  background-color: ${(props) => props.selected && "#fec25c"};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin: 1rem;
`;
const WidgetContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const EditContainer = styled.div`
  display: grid;
  /* height: 80vh; */
  gap: 2rem;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 2fr;
`;

const Alert = styled(motion.div)`
  width: 30rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  position: absolute;
  z-index: 1;
  top: 10px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  font-weight: 600;
  background:${({theme}) => theme.alertColor};
`;

const show = {
  hidden: { opacity: 0, y: -50, scale: 0.3 },
  visible: { opacity: 1, y: 20, scale: 1 },
  exit: { opacity: 0, y: 50, scale: 0.5 },
};

const HomeSetting = () => {
  const widgets = ["M01", "M02", "M03", "M04", "M05", "M06", "M07"];
  const widgetList = commonCode.M;
  const [cookies, setCookie, removeCookie] = useCookies(["myWidgets"]);
  const [isLoad, setIsLoad] = useState(false);
  const [isShow, setIsShow] = useState([]);
  const [isntShow, setIsntShow] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const wid = {
    M01: (
      <TodayClass
        key={widgets[0]}
        widgetId={widgets[0]}
        isShow={isShow}
        setIsShow={setIsShow}
        isntShow={isntShow}
        setIsntShow={setIsntShow}
      />
    ),
    M02: (
      <Dday
        key={widgets[1]}
        widgetId={widgets[1]}
        isShow={isShow}
        setIsShow={setIsShow}
        isntShow={isntShow}
        setIsntShow={setIsntShow}
      />
    ),
    M03: (
      <CheckList
        key={widgets[2]}
        widgetId={widgets[2]}
        isLoad={isLoad}
        setIsLoad={setIsLoad}
        isShow={isShow}
        setIsShow={setIsShow}
        isntShow={isntShow}
        setIsntShow={setIsntShow}
      />
    ),
    M04: (
      <Memo
        key={widgets[3]}
        widgetId={widgets[3]}
        isShow={isShow}
        setIsShow={setIsShow}
        isntShow={isntShow}
        setIsntShow={setIsntShow}
      />
    ),
    M05: (
      <Score
        key={widgets[4]}
        widgetId={widgets[4]}
        isShow={isShow}
        setIsShow={setIsShow}
        isntShow={isntShow}
        setIsntShow={setIsntShow}
      />
    ),
    M06: (
      <StudyRecord
        key={widgets[5]}
        widgetId={widgets[5]}
        isShow={isShow}
        setIsShow={setIsShow}
        isntShow={isntShow}
        setIsntShow={setIsntShow}
      />
    ),
    M07: (
      <TimeTable
        key={widgets[6]}
        widgetId={widgets[6]}
        isShow={isShow}
        setIsShow={setIsShow}
        isntShow={isntShow}
        setIsntShow={setIsntShow}
      />
    ),
  };

  useEffect(() => {
    if (cookies.myWidgets) {
      console.log(cookies.myWidgets);
      setIsShow(cookies.myWidgets);
      setIsntShow(
        widgets.filter((w) => {
          return !cookies.myWidgets.includes(w);
        })
      );
    }
  }, []);

  const onClick = (event) => {
    const {
      target: { id },
    } = event;
    setIsShow([...isShow, id]);
    setIsntShow(
      isntShow.filter((wid) => {
        return wid !== id;
      })
    );
  };

  const apply = () => {
    setCookie("myWidgets", isShow, { path: "/" });
    setMessage("설정이 저장되었습니다!");
  };
  return (
    <Container>
      <Wrapper>
        <Buttons>
          <EditButton className="apply" onClick={apply} name="apply">
            적용
          </EditButton>
          <EditButton
            className="close"
            onClick={() => {
              navigate("/home");
            }}
          >
            취소
          </EditButton>
        </Buttons>
        <WidgetContainer>
          {isShow.map((el) => (
            <OptionContainer
              whileHover={{
                scale: 1.02,
              }}
              key={el}
              id={el}
              selected={true}
            >
              {widgetList[el]}
            </OptionContainer>
          ))}
          {isntShow.map((widget) => (
            <OptionContainer
              whileHover={{
                scale: 1.02,
              }}
              key={widget}
              id={widget}
              selected={false}
              onClick={onClick}
            >
              {widgetList[widget]}
            </OptionContainer>
          ))}
        </WidgetContainer>
      </Wrapper>
      <EditContainer>{isShow.map((widget) => wid[widget])}</EditContainer>
      <AnimatePresence>
        {message && (
          <Alert variants={show} initial="hidden" animate="visible" exit="exit">
            {message}
          </Alert>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default HomeSetting;
