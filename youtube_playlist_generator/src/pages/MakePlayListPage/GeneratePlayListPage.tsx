import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../store/UserInfoContext";
import styled from "@emotion/styled";
import axios from "axios";
import Button from "components/Button/Button";
import { makeList } from "../../utils/removeTime";
import { VideoInfo } from "types/video";
import SelectBox from "components/SelectBox/SelectBox";
import { searchVideo } from "apis/Video/video";
import Loading from "components/Loading/Loading";
import Modal from "components/Modal/Modal";
import { dummy } from "testdata/test4";

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

type ModeProps = "generate" | "edit";

export default function MakePlayListPage() {
  const [authorizationCode, setAuthorizationCode] = useState("");
  const [songList, setSongList] = useState<string[]>([]);
  const REDIRECT_URI = "http://localhost:3000/create";
  const textRef = useRef<HTMLTextAreaElement | null>(null);

  const { accessToken, setAccessToken } = useContext(UserContext);
  const [mode, setMode] = useState<ModeProps>("generate");
  const [checkValue, setCheckValue] = useState<string[]>([]);
  const [loading] = useState(false);
  const [params, setParams] = useState({
    key: process.env.REACT_APP_YOUTUBE_API_KEY,
    part: "snippet",
    q: "",
    maxResults: 1,
    type: "video",
  });
  const [idArr, setIdArr] = useState<VideoInfo[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  async function getAccessToken() {
    console.log(authorizationCode);
    const token = axios.post("https://oauth2.googleapis.com/token", {
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      code: authorizationCode,
      grant_type: "authorization_code",
    });
    console.log(await token);
    setAccessToken((await token).data.access_token);
    sessionStorage.setItem("accessToken", (await token).data.access_token);
  }

  useEffect(() => {
    const auth = new URLSearchParams(window.location.search).get("code");
    console.log(auth);
    if (auth !== null) {
      setAuthorizationCode(auth);
    }
    window.history.pushState("", "createPage", "/create");
  }, []);

  useEffect(() => {
    if (authorizationCode !== "") {
      getAccessToken();
      console.log(authorizationCode);
    }
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

  const getIdArr = async () => {
    const promiseResult = checkValue.map((song) => {
      params.q = song;
      return searchVideo(params);
    });
    const result = await Promise.all(promiseResult);
    console.log(result);
    setIdArr(result);
    setModalOpen(true);
  };

  return (
    <Wrapper>
      <Title>타임라인 넣어주세요</Title>
      {loading ? <Loading /> : null}
      <ContentDiv>
        <TextBox ref={textRef} disabled={mode === "edit"} />
        <ButtonWrapper>
          {mode === "generate" ? (
            <Button
              buttonType="large"
              colorType="aqua"
              onClick={clickGenerate}
              disabled={loading}
            >
              리스트 생성
            </Button>
          ) : (
            <Button
              buttonType="large"
              colorType="aqua"
              onClick={clickEdit}
              disabled={loading}
            >
              리스트 편집
            </Button>
          )}
        </ButtonWrapper>
        <SelectBox
          songList={songList.filter((element) => element !== "")}
          setCheckValue={setCheckValue}
        />
      </ContentDiv>
      <Button
        buttonType="large"
        colorType="aqua"
        onClick={getIdArr}
        disabled={loading}
      >
        곡 불러오기
      </Button>
      {modalOpen ? (
        // <Modal setModalOpen={setModalOpen} songInfoArr={dummy as VideoInfo[]} />
        <Modal setModalOpen={setModalOpen} songInfoArr={idArr} />
      ) : null}
    </Wrapper>
  );
}
