import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import Button from "components/Button/Button";
import { makeList } from "../../utils/removeTime";
import { VideoInfo } from "types/video";
import SelectBox from "components/SelectBox/SelectBox";
import { searchVideo } from "apis/Video/video";
import Loading from "components/Loading/Loading";
import Modal from "components/Modal/Modal";
import Stepper from "components/Stepper/Stepper";
import {
  getAccessToken,
  getAccessTokenByRefreshToken,
} from "apis/Tokens/token";
import { getCookie, setCookie } from "utils/cookie";
import Logo from "components/Logo/Logo";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 96px 24px 64px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 34px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--ypg-ink);
  word-break: keep-all;
`;

const Highlight = styled.span`
  background: linear-gradient(135deg, #ff2d55, #d60029);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  margin-top: 10px;
  color: var(--ypg-muted);
  font-size: 15px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 920px;
  background: var(--ypg-card);
  backdrop-filter: blur(12px);
  border: 1px solid var(--ypg-border);
  border-radius: 24px;
  padding: 32px;
  box-shadow: var(--ypg-shadow);
`;

const ContentDiv = styled.div`
  display: flex;
  gap: 24px;
  align-items: stretch;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Panel = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PanelHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 22px;
`;

const PanelLabel = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: var(--ypg-faint);
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const Count = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: var(--ypg-red-dark);
  background: var(--ypg-red-soft);
  padding: 3px 10px;
  border-radius: 999px;
`;

const TextExampleBtn = styled.button`
  border: none;
  background: none;
  color: var(--ypg-muted);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    color: var(--ypg-red-dark);
  }
`;

const TextBox = styled.textarea`
  width: 100%;
  height: 380px;
  border: 1.5px solid var(--ypg-border);
  border-radius: 16px;
  resize: none;
  padding: 18px;
  line-height: 1.6rem;
  font-size: 15px;
  background-color: var(--ypg-input);
  color: var(--ypg-ink);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  outline: none;

  &:focus {
    border-color: var(--ypg-red);
    box-shadow: 0 0 0 4px var(--ypg-red-soft);
  }
  &:disabled {
    opacity: 0.7;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;

  @media only screen and (max-width: 768px) {
    flex-direction: row;
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 28px;
`;

const Hint = styled.span`
  font-size: 12px;
  color: var(--ypg-faint);
`;

const ErrorBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.25);
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 18px;
`;

const Progress = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--ypg-muted);
  font-size: 14px;
  margin-bottom: 12px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const SAMPLE = `00:00 Hello - JOY
03:24 밤편지 - 아이유
06:58 좋은 날 - 아이유
10:31 첫사랑 - 버즈
14:02 사건의 지평선 - 윤하`;

const countSongs = (raw: string) =>
  new Set(makeList(raw.split("\n")).filter((s) => s !== "")).size;

type ModeProps = "generate" | "edit";

export default function MakePlayListPage() {
  const [songList, setSongList] = useState<string[]>([]);
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const [mode, setMode] = useState<ModeProps>("generate");
  const [checkValue, setCheckValue] = useState<string[]>([]);
  const [detected, setDetected] = useState(0);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [error, setError] = useState<string | null>(null);
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
  const clickEdit = () => setMode("generate");

  const fillSample = () => {
    if (textRef.current) {
      textRef.current.value = SAMPLE;
      setDetected(countSongs(SAMPLE));
    }
  };

  const getIdArr = async () => {
    if (checkValue.length === 0 || loading) return;
    setError(null);
    setLoading(true);
    setProgress({ done: 0, total: checkValue.length });
    try {
      let done = 0;
      const promises = checkValue.map(async (song) => {
        const res = await searchVideo({
          key: process.env.REACT_APP_YOUTUBE_API_KEY,
          part: "snippet",
          q: song,
          maxResults: 5,
          type: "video",
        });
        done += 1;
        setProgress({ done, total: checkValue.length });
        return res as VideoInfo;
      });
      const result = await Promise.all(promises);
      setIdArr(result.filter((r) => r.items && r.items.length > 0));
      setModalOpen(true);
    } catch (e) {
      setError("곡 검색에 실패했어요. 네트워크나 API 키를 확인 후 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  const step = modalOpen ? 2 : mode === "edit" ? 1 : 0;

  return (
    <Wrapper>
      <Logo />
      <ContentWrapper>
        <Header>
          <Title>
            타임라인을 <Highlight>붙여넣어</Highlight> 주세요
          </Title>
          <Subtitle>
            영상 댓글의 타임라인을 넣고 원하는 곡만 골라 재생목록을 만들어 보세요.
          </Subtitle>
        </Header>

        <Stepper current={step} />

        <Card>
          {error ? <ErrorBanner>⚠️ {error}</ErrorBanner> : null}
          <ContentDiv>
            <Panel>
              <PanelHead>
                <PanelLabel>1 · 타임라인 입력</PanelLabel>
                {mode === "generate" ? (
                  <TextExampleBtn onClick={fillSample}>예시 채우기</TextExampleBtn>
                ) : detected > 0 ? (
                  <Count>{detected}곡 감지됨</Count>
                ) : null}
              </PanelHead>
              <TextBox
                ref={textRef}
                disabled={mode === "edit"}
                onChange={(e) => setDetected(countSongs(e.target.value))}
                onKeyDown={(e) => {
                  if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                    clickGenerate();
                  }
                }}
                placeholder="타임라인을 넣어주세요(가수명도 넣어주면 더 좋아요) &#13;&#10;ex)&#13;&#10;00:00:00 노래 - 가수&#13;&#10;00:00:00 노래 - 가수&#13;&#10;00:00:00 노래 - 가수&#13;&#10;..."
              />
            </Panel>
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
                  colorType="gray"
                  onClick={clickEdit}
                  disabled={loading}
                >
                  리스트 편집
                </Button>
              )}
            </ButtonWrapper>
            <Panel>
              <PanelHead>
                <PanelLabel>2 · 곡 선택</PanelLabel>
                {checkValue.length > 0 ? (
                  <Count>{checkValue.length}곡 선택됨</Count>
                ) : null}
              </PanelHead>
              <SelectBox
                songList={songList.filter((element) => element !== "")}
                setCheckValue={setCheckValue}
              />
            </Panel>
          </ContentDiv>
          <Footer>
            {loading ? (
              <Progress>
                <Loading />
                <span>
                  곡 검색 중… ({progress.done}/{progress.total})
                </span>
              </Progress>
            ) : (
              <>
                <Button
                  buttonType="large"
                  colorType="aqua"
                  width="240"
                  onClick={getIdArr}
                  disabled={checkValue.length === 0}
                >
                  {checkValue.length > 0
                    ? `곡 불러오기 (${checkValue.length})`
                    : "곡 불러오기"}
                </Button>
                {checkValue.length === 0 ? (
                  <Hint>먼저 왼쪽에서 타임라인을 생성하고 곡을 선택하세요</Hint>
                ) : null}
              </>
            )}
          </Footer>
        </Card>

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
