import styled from "styled-components";
import CreateButton from "../components/layout/CreateButton";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const testName = "tester";

const WritePage = ({ updateState = false }) => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const boardTitle = useRef(null);
  const boardContents = useRef(null);
  const navigate = useNavigate();
  const index = searchParams.get("index");

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  const changeContents = (e) => {
    setContents(e.target.value);
  };

  // 게시글 수정이면 아래에 api를 요청해 제목이랑 내용 가져오기
  useEffect(() => {
    if (updateState) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/board_req?id=${index}`
          );
          const data = await response.json();
          console.log(data[0]);
          boardTitle.current.value = data[0].board_title;
          boardContents.current.value = data[0].board_contents;
          setTitle(data[0].board_title);
          setContents(data[0].board_contents);
        } catch (error) {
          console.error("에러:", error);
        }
      };
      fetchData();
    }
  }, []);

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
      const response = await fetch(
        `http://localhost:3000/${updateState ? "update" : "write"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            updateState
              ? {
                  index,
                  title,
                  contents,
                }
              : {
                  testName,
                  title,
                  contents,
                }
          ),
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        alert(
          updateState ? "게시글이 수정되었습니다." : "게시글이 등록되었습니다!"
        );

        // ✅ 초기화
        setTitle("");
        setContents("");
        if (boardTitle.current) boardTitle.current.value = "";
        if (boardContents.current) boardContents.current.value = "";

        // ✅ 성공한 경우에만 페이지 이동
        navigate(updateState ? `/content?index=${index}` : "/");
        console.log(result.message);
      } else {
        // 실패했을 때 서버 메시지 출력
        alert(result.message);
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
          <CreateButton
            buttonName={updateState ? "수정" : "등록"}
            clickEvent={handleSubmit}
          />
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
