import styled from "styled-components";
import CreateButton from "../components/layout/CreateButton";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const testName = "tester";

const WritePage = () => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const boardTitle = useRef(null);
  const boardContents = useRef(null);
  const navigate = useNavigate(); // ✅ 추가

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  const changeContents = (e) => {
    setContents(e.target.value);
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("제목을 입력해주세요!");
      boardTitle.current.focus();
      return;
    }

    if (!contents.trim()) {
      alert("내용을 입력해주세요!");
      boardContents.current.focus();
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/write", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testName,
          title,
          contents,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert("게시글이 등록되었습니다!");

        // ✅ 초기화
        setTitle("");
        setContents("");
        if (boardTitle.current) boardTitle.current.value = "";
        if (boardContents.current) boardContents.current.value = "";

        // ✅ 성공한 경우에만 페이지 이동
        navigate("/");
      } else {
        // 실패했을 때 서버 메시지 출력
        alert(result.message || "등록 실패");
      }
    } catch (error) {
      console.error("에러 발생:", error.message);
      alert("게시글 등록 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    boardTitle.current.focus();
  }, []);

  return (
    <Wrap>
      <BoardMainContainer>
        <InputTitle
          placeholder="제목을 입력해주세요"
          ref={boardTitle}
          onChange={changeTitle}
        />
        <InputContent
          placeholder="내용을 입력해주세요"
          ref={boardContents}
          onChange={changeContents}
        />
        <WriteMenu>
          <CreateButton buttonName={"등록"} clickEvent={handleSubmit} />
        </WriteMenu>
      </BoardMainContainer>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 80px;
`;

const BoardMainContainer = styled.div`
  width: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 50px;
  @media (max-width: 1000px) {
    width: 90%;
  }
`;

const InputTitle = styled.input`
  width: 100%;
  font-size: 20px;
  padding: 10px;
  outline: none;
  border-radius: 10px;
  border: 1px solid black;
`;

const InputContent = styled.textarea`
  padding: 10px;
  font-size: 20px;
  width: 100%;
  min-height: 400px;
  padding: 10px;
  resize: none;
  outline: none;
  border-radius: 10px;
  border: 1px solid black;
`;

const WriteMenu = styled.div`
  width: calc(100% + 20px);
  display: flex;
  justify-content: end;
  align-items: center;
`;

export default WritePage;
