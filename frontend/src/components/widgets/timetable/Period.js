import React from 'react';
import styled from "styled-components";

const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 2rem;
  font-weight: bold;
`;

const Period = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 2rem;
  font-size: 20px;
  text-align: center;
  line-height: 30px;
  div{
  height:30px;
  }

  &.Today{
    article{
    color:#FEC25C;
    }
    div{
      background-color: #FEC25C;
    }
  }

  `;

const Day = styled.article`
  font-size: 20px;
  height:30px;

`;

const Class = styled.section`
  height:30px;
  font-size: 15px;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 1.3rem;
  
  div{
    border: 1px solid #F2F2F2;
    box-shadow: 0px 4px 4px 2px rgb(0 0 0 / 10%);
    border-radius: 2px 22px;
    background-color: #f2f2f2;
  }

  section{
    border: 1px solid white;
    box-shadow: 0px 4px 4px 2px white;
    border-radius: 2px 22px;
    background-color: white;
  }
`;

const First = styled.div``;

const Second = styled.div``;

const Third = styled.div``;

const Fourth = styled.div``;

const Fifth = styled.div``;

const Sixth = styled.div``;

const Seventh = styled.div``;

const period = () => {
    return (
        <Main>
            <Period>
            <Day></Day>
            <Class>
            <section>1교시</section>
            <section>2교시</section>
            <section>3교시</section>
            <section>4교시</section>
            <section>5교시</section>
            <section>6교시</section>
            <section>7교시</section>
            </Class>
            </Period>

            <Period>
            <Day>월</Day>
            <Class>
                <First>음악</First>
                <Second>국어</Second>
                <Third>화학</Third>
                <Fourth>미술</Fourth>
                <Fifth>수학</Fifth>
                <Sixth>음악</Sixth>
                <Seventh>영어</Seventh>
            </Class>
            </Period>

            <Period className="Today">
            <Day>화</Day>
            <Class>
                <First>음악</First>
                <Second>국어</Second>
                <Third>화학</Third>
                <Fourth>미술</Fourth>
                <Fifth>수학</Fifth>
                <Sixth>음악</Sixth>
                <Seventh>영어</Seventh>
            </Class>
            </Period>

            <Period>
            <Day>수</Day>
            <Class>
                <First>음악</First>
                <Second>국어</Second>
                <Third>화학</Third>
                <Fourth>미술</Fourth>
                <Fifth>수학</Fifth>
                <Sixth>음악</Sixth>
                <Seventh>영어</Seventh>
            </Class>
            </Period>

            <Period>
            <Day>목</Day>
            <Class>
                <First>음악</First>
                <Second>국어</Second>
                <Third>화학</Third>
                <Fourth>미술</Fourth>
                <Fifth>수학</Fifth>
                <Sixth>음악</Sixth>
                <Seventh>영어</Seventh>
            </Class>
            </Period>

            <Period>
            <Day>금</Day>
            <Class>
                <First>음악</First>
                <Second>국어</Second>
                <Third>화학</Third>
                <Fourth>미술</Fourth>
                <Fifth>수학</Fifth>
                <Sixth>음악</Sixth>
                <Seventh>영어</Seventh>
            </Class>
            </Period>
        </Main>
    );
};

export default period;