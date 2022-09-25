import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../store/UserInfoContext";
import styled from "@emotion/styled";
import axios from "axios";
import Button from "components/Button/Button";
import { makeList } from "../../utils/removeTime";
import SelectBox from "components/SelectBox/SelectBox";

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

const ResultDiv = styled.div`
  border: 1px solid;
  width: 400px;
  height: 400px;
  border-radius: 8px;
  padding: 20px;
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

type ModeProps = "generate" | "edit";

export default function MakePlayListPage() {
  const [authorizationCode, setAuthorizationCode] = useState("");
  const [songList, setSongList] = useState<string[]>([]);
  const REDIRECT_URI = "http://localhost:3000/create";
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const { accessToken, setAccessToken } = useContext(UserContext);
  const [mode, setMode] = useState<ModeProps>("generate");
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

  const clickGen = () => {
    setMode("edit");
    const list = textRef.current?.value;
    console.log(list);
    if (list !== undefined) {
      setSongList(makeList(list.split("\n")));
    }
  };
  const clickEdit = () => {
    setMode("generate");
  };

  useEffect(() => {
    console.log(songList);
  }, [songList]);
  return (
    <Wrapper>
      <Title>타임라인 넣어주세요</Title>
      <ContentDiv>
        <TextBox ref={textRef} disabled={mode === "edit"} />
        <ButtonWrapper>
          {mode === "generate" ? (
            <Button buttonType="large" colorType="aqua" onClick={clickGen}>
              리스트 생성
            </Button>
          ) : (
            <Button buttonType="large" colorType="aqua" onClick={clickEdit}>
              리스트 편집
            </Button>
          )}
        </ButtonWrapper>
        <SelectBox songList={songList.filter((element) => element !== "")} />
      </ContentDiv>
      <InputWrapper>
        <label>플레이리스트 제목을 입력해주세요</label>
        <input />
        <button>생성</button>
      </InputWrapper>
    </Wrapper>
  );
}
