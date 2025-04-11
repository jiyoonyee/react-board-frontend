import styled from "styled-components";
import { Link } from "react-router-dom";

const SubmitButton = ({ buttonName }) => {
  return (
    <>
      <Wrap>
        <Link>{buttonName}</Link>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & > a {
    background-color: white;
    border-radius: 1000px;
    border: 1px solid black;
    font-size: 15px;
    padding: 10px 15px;
    cursor: pointer;
  }
`;

export default SubmitButton;
