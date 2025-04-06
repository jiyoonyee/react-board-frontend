import styled from "styled-components";
import SubmitButton from "../atoms/SubmitButton";

const Header = () => {
  return (
    <>
      <Wrap>
        <div>
          <SubmitButton buttonName={"로그인"}></SubmitButton>
          <SubmitButton buttonName={"회원가입"}></SubmitButton>
        </div>
      </Wrap>
    </>
  );
};

const Wrap = styled.header`
  display: flex;
  justify-content: end;
  align-items: center;
  border-bottom: 1px solid;
  padding: 20px 30px;
  /* background-color: white; */
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
  }
`;

export default Header;
