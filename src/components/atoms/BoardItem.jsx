import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { decode } from "he";

const BoardItem = ({ id, title, write_day, writer, getBoardIdFunction }) => {
  console.log(id);
  return (
    <>
      <Wrap>
        <p>{id}</p>
        <p onClick={getBoardIdFunction}>{decode(title)}</p>
        <p>{write_day.split("T")[0]}</p>
        <p>{writer}</p>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 1em;
  border-bottom: 1px solid black;
  transition: 0.2s all ease-in-out;
  &:hover {
    background-color: aliceblue;
  }
  & > p {
    display: flex;
    justify-content: center;
    align-items: center;
    word-break: keep-all;
    padding: 20px 0px;
    height: 20px;
  }

  & > p:nth-child(1) {
    width: 5%;
    font-size: 1.1em;
    @media (max-width: 1000px) {
      width: 10%;
    }
  }
  & > p:nth-child(2) {
    width: 73%;
    justify-content: left;
    cursor: pointer;
    @media (max-width: 1000px) {
      width: 78%;
    }
  }
  & > p:nth-child(3) {
    width: 12%;
    @media (max-width: 1000px) {
      display: none;
    }
  }
  & > p:nth-child(4) {
    width: 10%;
    @media (max-width: 1000px) {
      width: 15%;
    }
  }
`;

export default BoardItem;
