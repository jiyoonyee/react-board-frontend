import styled from "styled-components";
import SubmitButton from "./SubmitButton";
import { Link } from "react-router-dom";

const Header = ({ loginState, updateLoginState, username, updateUserId }) => {
  console.log("유저 네임 : " + username);
  return (
    <>
      <Wrap>
        <Link to={"/"}>MAIN</Link>
        {loginState ? (
          <div>
            <h1>{username} 님 환영합니다</h1>
            <SubmitButton
              buttonName={"로그아웃"}
              linkName={""}
              updateLoginState={updateLoginState}
              updateUserId={updateUserId}
              username={username}
            />
          </div>
        ) : (
          <div>
            <SubmitButton
              buttonName={"로그인"}
              linkName={"login"}
            ></SubmitButton>
            <SubmitButton
              buttonName={"회원가입"}
              linkName={"signup"}
            ></SubmitButton>
          </div>
        )}
      </Wrap>
    </>
  );
};

const Wrap = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid;
  padding: 0px 30px;
  height: 80px;
  /* background-color: white; */
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
  }
`;

export default Header;
