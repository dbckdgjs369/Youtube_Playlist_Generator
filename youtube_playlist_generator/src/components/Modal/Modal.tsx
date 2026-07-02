import styled from "@emotion/styled";
import {
  addToPlayList,
  createNewPlayList,
  Privacy,
} from "apis/Playlist/playlist";
import Button from "components/Button/Button";
import Loading from "components/Loading/Loading";
import { VideoInfo } from "types/video";
import { useEffect, useRef, useState } from "react";
import { text } from "styles/theme";
import SongItem from "./SongItem";

interface ModalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  songInfoArr: VideoInfo[];
  accessToken: string;
}

const ModalWrapper = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(15, 17, 21, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  animation: fade 0.2s ease;
  @keyframes fade {
    from {
      opacity: 0;
    }
  }
`;

const ModalBody = styled.div`
  width: 90%;
  max-width: 580px;
  max-height: 84vh;
  padding: 28px;
  display: flex;
  flex-direction: column;
  background-color: var(--ypg-card-solid);
  border: 1px solid var(--ypg-border);
  border-radius: 22px;
  box-shadow: 0 40px 80px -30px rgba(0, 0, 0, 0.55);
  animation: pop 0.22s cubic-bezier(0.2, 0.9, 0.3, 1.2);
  @keyframes pop {
    from {
      transform: translateY(12px) scale(0.98);
      opacity: 0;
    }
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
`;

const HeaderTitle = styled.h2`
  ${text.$headline5}
  color: var(--ypg-ink);
`;

const CloseBtn = styled.button`
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 50%;
  background-color: var(--ypg-chip);
  color: var(--ypg-muted);
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.15s ease;
  &:hover {
    background-color: var(--ypg-row-hover);
  }
`;

const ContentDiv = styled.div`
  overflow-y: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-right: 4px;
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--ypg-border);
    border-radius: 8px;
  }
`;

const Footer = styled.div`
  margin-top: 22px;
  padding-top: 20px;
  border-top: 1px solid var(--ypg-border);
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Label = styled.label`
  ${text.$subtitle1}
  color: var(--ypg-ink);
`;

const Segmented = styled.div`
  display: flex;
  gap: 6px;
  background: var(--ypg-chip);
  padding: 4px;
  border-radius: 12px;
`;

const Seg = styled.button<{ active: boolean }>`
  flex: 1;
  height: 38px;
  border: none;
  border-radius: 9px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
  background: ${({ active }) => (active ? "var(--ypg-card-solid)" : "transparent")};
  color: ${({ active }) => (active ? "var(--ypg-red-dark)" : "var(--ypg-muted)")};
  box-shadow: ${({ active }) =>
    active ? "0 4px 10px -6px rgba(15,17,21,0.4)" : "none"};
`;

const InputRow = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledInput = styled.input`
  height: 46px;
  flex: 1;
  border: 1.5px solid var(--ypg-border);
  border-radius: 12px;
  font-size: 15px;
  padding: 0 14px;
  outline: none;
  background: var(--ypg-input);
  color: var(--ypg-ink);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  &:focus {
    border-color: var(--ypg-red);
    box-shadow: 0 0 0 4px var(--ypg-red-soft);
  }
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 40px 0;
  text-align: center;
`;

const BigIcon = styled.div<{ tone?: "ok" | "err" }>`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 34px;
  color: #fff;
  background: ${({ tone }) =>
    tone === "err"
      ? "linear-gradient(135deg,#ff6b6b,#ef4444)"
      : "linear-gradient(135deg,#34d399,#22c55e)"};
  box-shadow: 0 16px 30px -14px rgba(34, 197, 94, 0.6);
`;

const CenterTitle = styled.h3`
  ${text.$headline5}
  color: var(--ypg-ink);
`;

const CenterDesc = styled.p`
  color: var(--ypg-muted);
  font-size: 14px;
  line-height: 1.5;
`;

const OpenLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  background: linear-gradient(135deg, #ff2d55, #d60029);
  color: #fff;
  font-weight: 700;
  padding: 13px 22px;
  border-radius: 12px;
  box-shadow: 0 12px 26px -10px rgba(255, 0, 51, 0.5);
  transition: transform 0.15s ease, filter 0.15s ease;
  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.05);
  }
`;

const LinkBtn = styled.button`
  border: none;
  background: none;
  color: var(--ypg-muted);
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
`;

const PRIVACY: { key: Privacy; label: string }[] = [
  { key: "private", label: "🔒 비공개" },
  { key: "unlisted", label: "🔗 일부공개" },
  { key: "public", label: "🌐 공개" },
];

type Phase = "review" | "creating" | "done" | "error";

const Modal = ({ setModalOpen, songInfoArr, accessToken }: ModalProps) => {
  const [songArr, setSongArr] = useState<VideoInfo[]>(songInfoArr);
  const [picked, setPicked] = useState<number[]>(() =>
    songInfoArr.map(() => 0)
  );
  const [phase, setPhase] = useState<Phase>("review");
  const [privacy, setPrivacy] = useState<Privacy>("private");
  const [createdId, setCreatedId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const inputRef = useRef<HTMLInputElement | null>(null);

  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  const currentItem = (i: number) => songArr[i]?.items[picked[i]] ?? songArr[i]?.items[0];

  const handleDelete = (i: number) => {
    setSongArr((prev) => prev.filter((_, idx) => idx !== i));
    setPicked((prev) => prev.filter((_, idx) => idx !== i));
  };

  const handleSwap = (i: number) => {
    setPicked((prev) => {
      const next = [...prev];
      const count = songArr[i].items.length;
      next[i] = (next[i] + 1) % count;
      return next;
    });
  };

  const createPlayList = async () => {
    if (songArr.length === 0) return;
    setPhase("creating");
    setProgress({ done: 0, total: songArr.length });
    try {
      const title =
        inputRef.current && inputRef.current.value.trim() !== ""
          ? inputRef.current.value.trim()
          : "YPG";
      const { data } = await createNewPlayList(title, accessToken, privacy);
      const playlistId = data.id;
      for (let i = 0; i < songArr.length; i++) {
        const item = currentItem(i);
        if (item) await addToPlayList(accessToken, playlistId, item.id.videoId);
        setProgress({ done: i + 1, total: songArr.length });
      }
      setCreatedId(playlistId);
      setPhase("done");
    } catch (e: any) {
      const status = e?.response?.status;
      setErrorMsg(
        status === 401 || status === 403
          ? "로그인이 만료되었거나 권한이 없어요. 다시 로그인 후 시도해 주세요."
          : "재생목록 생성 중 문제가 발생했어요. 잠시 후 다시 시도해 주세요."
      );
      setPhase("error");
    }
  };

  return (
    <ModalWrapper onClick={closeModal}>
      <ModalBody onClick={(e) => e.stopPropagation()}>
        <Header>
          <HeaderTitle>
            {phase === "done"
              ? "완료되었어요 🎉"
              : phase === "creating"
              ? "재생목록 만드는 중…"
              : "곡 확인 및 재생목록 만들기"}
          </HeaderTitle>
          <CloseBtn aria-label="닫기" onClick={closeModal}>
            ✕
          </CloseBtn>
        </Header>

        {phase === "creating" ? (
          <Center>
            <Loading />
            <CenterDesc>
              곡을 재생목록에 담고 있어요 ({progress.done}/{progress.total})
            </CenterDesc>
          </Center>
        ) : phase === "done" ? (
          <Center>
            <BigIcon>✓</BigIcon>
            <CenterTitle>재생목록이 생성됐어요!</CenterTitle>
            <CenterDesc>
              총 {progress.total}곡이 담겼어요. 아래 버튼으로 바로 확인하세요.
            </CenterDesc>
            <OpenLink
              target="_blank"
              rel="noreferrer"
              href={`https://www.youtube.com/playlist?list=${createdId}`}
            >
              ▶ 유튜브에서 재생목록 열기
            </OpenLink>
            <LinkBtn onClick={closeModal}>닫기</LinkBtn>
          </Center>
        ) : phase === "error" ? (
          <Center>
            <BigIcon tone="err">!</BigIcon>
            <CenterTitle>앗, 실패했어요</CenterTitle>
            <CenterDesc>{errorMsg}</CenterDesc>
            <Button
              buttonType="large"
              colorType="aqua"
              width="140"
              onClick={() => setPhase("review")}
            >
              다시 시도
            </Button>
            <LinkBtn onClick={closeModal}>닫기</LinkBtn>
          </Center>
        ) : songArr.length === 0 ? (
          <Center>
            <span style={{ fontSize: 34 }}>🗑️</span>
            <CenterDesc>선택된 곡이 없어요. 다시 골라 주세요.</CenterDesc>
          </Center>
        ) : (
          <>
            <ContentDiv>
              {songArr.map((info, i) => {
                const item = currentItem(i);
                if (!item) return null;
                return (
                  <SongItem
                    key={`${item.id.videoId}-${i}`}
                    src={item.snippet.thumbnails.default.url}
                    title={item.snippet.title.replaceAll("&#39;", "'")}
                    vid={item.id.videoId}
                    channel={item.snippet.channelTitle}
                    candidateCount={info.items.length}
                    candidateIndex={picked[i]}
                    onSwap={() => handleSwap(i)}
                    onDelete={() => handleDelete(i)}
                  />
                );
              })}
            </ContentDiv>
            <Footer>
              <Segmented>
                {PRIVACY.map((p) => (
                  <Seg
                    key={p.key}
                    type="button"
                    active={privacy === p.key}
                    onClick={() => setPrivacy(p.key)}
                  >
                    {p.label}
                  </Seg>
                ))}
              </Segmented>
              <Label>플레이리스트 제목을 입력해주세요</Label>
              <InputRow>
                <StyledInput ref={inputRef} placeholder="ex) YPG" />
                <Button
                  buttonType="large"
                  colorType="aqua"
                  width="130"
                  onClick={createPlayList}
                >
                  {songArr.length}곡 생성
                </Button>
              </InputRow>
            </Footer>
          </>
        )}
      </ModalBody>
    </ModalWrapper>
  );
};

export default Modal;
