import styled from "styled-components";
import { Link } from "react-router-dom";

const CreateButton = ({ buttonName, clickEvent }) => {
  return (
    <>
      <Wrap onClick={clickEvent}>{buttonName}</Wrap>
    </>
  );
};

const Wrap = styled.button`
  background-color: white;
  border-radius: 10px;
  border: 1px solid black;
  font-size: 1em;
  padding: 10px 15px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: black;
    color: white;
  }
`;

export default CreateButton;
