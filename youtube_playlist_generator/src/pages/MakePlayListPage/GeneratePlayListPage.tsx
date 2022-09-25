import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../store/UserInfoContext";
import styled from "@emotion/styled";
import axios from "axios";
import Button from "components/Button/Button";
import { makeList } from "../../utils/removeTime";
import SelectBox from "components/SelectBox/SelectBox";
import { text } from "styles/theme";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 50px;
  margin-top: 30px;
`;

const TextBox = styled.textarea`
  width: 400px;
  height: 400px;
  border-radius: 8px;
  resize: none;
  padding: 20px;
  line-height: 1.5rem;
`;

const Title = styled.h1`
  font-size: large;
`;

const ContentDiv = styled.div`
  display: flex;
  gap: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const InputDiv = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledInput = styled.input`
  height: 30px;
  width: 300px;
  border-radius: 8px;
  font-size: large;
  padding: 5px;
`;

const StyledLabel = styled.label`
  ${text.$body1}
`;

type ModeProps = "generate" | "edit";

export default function MakePlayListPage() {
  const [authorizationCode, setAuthorizationCode] = useState("");
  const [songList, setSongList] = useState<string[]>([]);
  const REDIRECT_URI = "http://localhost:3000/create";
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { accessToken, setAccessToken } = useContext(UserContext);
  const [mode, setMode] = useState<ModeProps>("generate");
  const [checkValue, setCheckValue] = useState<string[]>([]);

  async function getAccessToken() {
    const token = axios.post("https://oauth2.googleapis.com/token", {
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      code: authorizationCode,
      grant_type: "authorization_code",
    });
    setAccessToken((await token).data.access_token);
  }

  useEffect(() => {
    const auth = new URLSearchParams(window.location.search).get("code");
    if (auth !== null) {
      setAuthorizationCode(auth);
    }
    window.history.pushState("", "createPage", "/create");
  }, []);

  useEffect(() => {
    getAccessToken();
  }, [authorizationCode]);

  const clickGenerate = () => {
    setMode("edit");
    const list = textRef.current?.value;
    console.log(list);
    if (list !== undefined) {
      setSongList([...new Set(makeList(list.split("\n")))]);
    }
  };
  const clickEdit = () => {
    setMode("generate");
  };
  const createPlayList = () => {
    // 받은 플레이 리스트 목록 vid찾기
    // 입력받은 플리 제목 받고, 이걸로 플리 생성
    // 플리에 vid 넣기
  };

  return (
    <Wrapper>
      <Title>타임라인 넣어주세요</Title>
      <ContentDiv>
        <TextBox ref={textRef} disabled={mode === "edit"} />
        <ButtonWrapper>
          {mode === "generate" ? (
            <Button buttonType="large" colorType="aqua" onClick={clickGenerate}>
              리스트 생성
            </Button>
          ) : (
            <Button buttonType="large" colorType="aqua" onClick={clickEdit}>
              리스트 편집
            </Button>
          )}
        </ButtonWrapper>
        <SelectBox
          songList={songList.filter((element) => element !== "")}
          setCheckValue={setCheckValue}
        />
      </ContentDiv>
      <InputWrapper>
        <StyledLabel>플레이리스트 제목을 입력해주세요</StyledLabel>
        <InputDiv>
          <StyledInput ref={inputRef} />
          <Button
            buttonType="large"
            colorType="aqua"
            width="50"
            onClick={createPlayList}
          >
            생성
          </Button>
        </InputDiv>
      </InputWrapper>
    </Wrapper>
  );
}
