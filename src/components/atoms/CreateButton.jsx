import styled from "styled-components";

const CreateButton = ({ buttonName }) => {
  return (
    <>
      <Wrap>{buttonName}</Wrap>
    </>
  );
};

const Wrap = styled.button`
  background-color: white;
  border-radius: 10px;
  border: 1px solid black;
  font-size: 18px;
  padding: 10px 15px;
  cursor: pointer;
`;

export default CreateButton;
