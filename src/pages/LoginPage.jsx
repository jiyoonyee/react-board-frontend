import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoginPage = ({ pageState, updateUserId, updateLoginState }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [id, setid] = useState("");
  const [pw, setpw] = useState("");

  const inputId = useRef(null);
  const inputPw = useRef(null);

  const updateid = (e) => {
    setid(e.target.value);
  };

  const updatepw = (e) => {
    setpw(e.target.value);
  };

  const linksignup = () => {
    // console.log(location);
    inputId.current.value = "";
    inputPw.current.value = "";
    if (location.pathname == "/signup") {
      navigate("/login");
    } else {
      navigate("/signup");
    }
  };

  const handleauth = async () => {
    if (!id.trim() && !pw.trim()) {
      return alert("아이디와 비밀번호를 입력해주세요");
    } else {
      if (!id.trim()) {
        return alert("id를 입력해주세요");
      }
      if (!pw.trim()) {
        return alert("비밀번호를 입력해주세요");
      }
    }

    try {
      const response = await fetch(
        `http://3.36.66.10:3000/auth/${pageState ? "login" : "signup"}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(
            pageState
              ? {
                  id,
                  pw,
                }
              : {
                  id,
                  pw,
                }
          ),
        }
      );

      const result = await response.json();
      console.log(result.state);
      if (result.state) {
        console.log(result.user);
        updateUserId(result.user);
        alert("성공적으로 로그인 되었습니다.");
        navigate("/");
        updateLoginState();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("에러 발생:", error.message);
      alert("회원가입 오류");
    }
  };

  return (
    <>
      <Wrap>
        <FormWrap>
          {pageState ? (
            <>
              <ModeName>로그인</ModeName>
            </>
          ) : (
            <>
              <ModeName>회원가입</ModeName>
            </>
          )}
          <form>
            <InputWrap>
              <input
                ref={inputId}
                placeholder="아이디를 입력해주세요"
                type="text"
                onChange={updateid}
              />
            </InputWrap>

            <InputWrap>
              <input
                ref={inputPw}
                autoComplete="off"
                placeholder="비밀번호를 입력해주세요"
                type="password"
                onChange={updatepw}
              />
            </InputWrap>
          </form>
          <SubmitWrap>
            {pageState && (
              <SubmitButton onClick={linksignup}>회원가입하기</SubmitButton>
            )}
            {!pageState && (
              <SubmitButton onClick={linksignup}>로그인하기</SubmitButton>
            )}
            <SubmitButton onClick={handleauth}>
              {pageState ? "로그인" : "회원가입"}
            </SubmitButton>
          </SubmitWrap>
        </FormWrap>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 80px 0px;
  gap: 30px;
`;

const FormWrap = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0px 0px 5px 1px #bebebe;
  padding: 40px 30px;
  border-radius: 10px;
  @media (max-width: 1000px) {
    width: 50%;
  }
  & > form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    gap: 20px;
  }
`;

const InputWrap = styled.div`
  width: 100%;
  background-color: white;
  border: 1px solid #bebebe;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  & > input {
    width: 100%;
    font-size: 20px;
    outline: none;
    border: none;
  }
`;

const SubmitWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 10px;
`;

const SubmitButton = styled.div`
  border-radius: 1000px;
  border: 1px solid black;
  padding: 10px 15px;
  &:hover {
    cursor: pointer;
  }
`;

const ModeName = styled.div`
  font-size: 36px;
  margin-bottom: 20px;
`;

export default LoginPage;
