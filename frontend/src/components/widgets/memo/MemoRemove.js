import { deleteMemo } from "api/memo";
import styled from "styled-components";

const Remove = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #ff6b6b;
  cursor: pointer;
  &:hover {
    color: #ff8787;
  }
`;

const MemoRemove = ({ memoId, setLoading }) => {
    const onRemove = () => {
        deleteMemo(memoId).then(setLoading(true));
      };
    return(
    <Remove onClick={onRemove}>
    ❌
    </Remove>
    );
};

export default MemoRemove;