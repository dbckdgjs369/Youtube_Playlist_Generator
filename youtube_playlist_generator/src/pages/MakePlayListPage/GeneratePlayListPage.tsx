import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import Button from "components/Button/Button";
import { makeList } from "../../utils/removeTime";
import { VideoInfo } from "types/video";
import SelectBox from "components/SelectBox/SelectBox";
import { searchVideo } from "apis/Video/video";
import Loading from "components/Loading/Loading";
import Modal from "components/Modal/Modal";
import {
  getAccessToken,
  getAccessTokenByRefreshToken,
} from "apis/Tokens/token";
import { getCookie, setCookie } from "utils/cookie";
import Logo from "components/Logo/Logo";

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  /* flex-direction: column; */
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
  font-size: 30px;
  font-weight: 800;
`;

const ContentDiv = styled.div`
  display: flex;
  gap: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
`;

const ContentWrapper = styled.div`
  display: flex;
  margin-top: 50px;
  flex-direction: column;
  /* justify-content: flex-start; */
  /* align-items: center; */
  gap: 20px;
`;

type ModeProps = "generate" | "edit";

export default function MakePlayListPage() {
  const [songList, setSongList] = useState<string[]>([]);
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const [mode, setMode] = useState<ModeProps>("generate");
  const [checkValue, setCheckValue] = useState<string[]>([]);
  const [loading] = useState(false);
  const [params] = useState({
    key: process.env.REACT_APP_YOUTUBE_API_KEY,
    part: "snippet",
    q: "",
    maxResults: 1,
    type: "video",
  });
  const [idArr, setIdArr] = useState<VideoInfo[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const auth = new URLSearchParams(window.location.search).get("code");
    if (auth) {
      (async function () {
        const token = await getAccessToken({ code: auth });
        setAccessToken(token.data.access_token);
        setCookie("refresh_token", token.data.refresh_token, {
          httpOnly: true,
        });
      })();
    } else {
      (async function () {
        const refresh_token = getCookie("refresh_token");
        const token = await getAccessTokenByRefreshToken({ refresh_token });
        setAccessToken(token);
      })();
    }
    window.history.pushState("", "createPage", "/create");
  }, []);

  const clickGenerate = () => {
    setMode("edit");
    const list = textRef.current?.value;
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
    setIdArr(result);
    setModalOpen(true);
  };
  useEffect(() => {
    console.log(idArr);
    sessionStorage.setItem("songs", JSON.stringify(idArr));
  }, [idArr]);

  return (
    <Wrapper>
      <Logo />
      <ContentWrapper>
        <Title>타임라인 넣어주세요</Title>
        {loading ? <Loading /> : null}
        <ContentDiv>
          <TextBox
            ref={textRef}
            disabled={mode === "edit"}
            placeholder="타임라인을 넣어주세요(가수명도 넣어주면 더 좋아요) &#13;&#10;ex)&#13;&#10;00:00:00 노래 - 가수&#13;&#10;00:00:00 노래 - 가수&#13;&#10;00:00:00 노래 - 가수&#13;&#10;..."
          />
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
          <Modal
            setModalOpen={setModalOpen}
            songInfoArr={idArr}
            accessToken={accessToken}
          />
        ) : null}
      </ContentWrapper>
    </Wrapper>
  );
}
