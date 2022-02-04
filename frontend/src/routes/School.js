import React, {useState} from "react";
import styled from "styled-components";
import CommuRegister from "components/school/CommuRegister";
import CommuList from "components/school/CommuList";
import CommuView from "components/school/CommuView";

const FormContainer = styled.div`
  box-sizing: border-box;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 5px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5rem;
  margin-right: 5rem;

  button {
    margin-left: auto;
    border-radius: 10px;
    cursor: pointer;
  }
`;

const School = () => {
  const [list, setList] = useState(true);
  const [view, setView] = useState(false);

  return (
    <FormContainer>
      {list?
        <CommuList setList={setList} setView={setView} />:
        (view?
          <CommuView setList={setList} setView={setView} />:
        <CommuRegister setList={setList} setView={setView} />)
      }
    </FormContainer>
  );
};

export default School;
