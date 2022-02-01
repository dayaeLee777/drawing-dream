import styled from "styled-components";
import { motion } from "framer-motion";
import profileImg from "assets/img/profile.png";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = styled(motion.div)`
  /* width: 10rem; */
  height: 10rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const Img = styled.img`
  width: 50%;
`;

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 4fr 1fr;

  svg {
    color: #fec25c;
  }
`;

const Name = styled.div`
  margin-bottom: 1.5rem;
  text-align: right;
  margin-right: 2rem;
`;

const Member = ({ data }) => {
  // console.log(data);
  return (
    <Container
      whileHover={{
        scale: 1.1,
      }}
    >
      <Img src={profileImg} />
      <Wrapper>
        <Name>{data.userName}</Name>
        <FontAwesomeIcon icon={faCommentDots} size="lg" />
      </Wrapper>
    </Container>
  );
};

export default Member;
