import styled from "styled-components";
import { Link } from "react-router-dom";

const SubmitButton = ({
  buttonName,
  linkName,
  updateLoginState,
  updateUserId,
}) => {
  const updatelogin = () => {
    if (updateLoginState) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://react-board-backend.onrender.com/auth/logout",
            {
              method: "POST",
              credentials: "include",
            }
          );
          const data = await response.json();
          alert(data.message);
        } catch (error) {
          console.error("데이터 불러오기 실패:", error);
        }
      };

      fetchData();

      // updateLoginState();
      // updateUserId("");

      // alert("성공적으로 로그아웃 되었습니다.");
      window.location.reload();
    }
  };

  return (
    <>
      <Wrap>
        <Link onClick={updatelogin} to={`/${linkName}`}>
          {buttonName}
        </Link>
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
    text-align: center;
    word-break: keep-all;
    cursor: pointer;
  }
`;

export default SubmitButton;
