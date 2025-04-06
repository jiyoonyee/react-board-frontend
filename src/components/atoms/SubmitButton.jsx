import styled from "styled-components";

const SubmitButton = ({ buttonName }) => {
  return (
    <>
      <Wrap>{buttonName}</Wrap>
    </>
  );
};

const Wrap = styled.button`
  background-color: white;
  border-radius: 1000px;
  border: 1px solid black;
  font-size: 15px;
  padding: 5px 10px;
  cursor: pointer;
`;

export default SubmitButton;
