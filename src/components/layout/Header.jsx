import styled from "styled-components";
import SubmitButton from "./SubmitButton";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Wrap>
        <Link to={"/"}>MAIN</Link>
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
  justify-content: space-between;
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
