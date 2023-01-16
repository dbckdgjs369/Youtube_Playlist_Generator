import styled from "@emotion/styled";
import { addToPlayList, createNewPlayList } from "apis/Playlist/playlist";
import Button from "components/Button/Button";
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalBody = styled.div`
  position: absolute;
  width: 50%;
  height: 500px;
  padding: 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  overflow: auto;
`;
const InputWrapper = styled.div`
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translate(-50%, 0%);
`;
const InputDiv = styled.div`
  display: flex;
  justify-content: center;
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
const ContentDiv = styled.div`
  overflow-y: scroll;
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #2f3542;
    border-radius: 8px;
  }
  ::-webkit-scrollbar-track {
    background-color: grey;
    border-radius: 8px;
  }
`;

const Modal = ({ setModalOpen, songInfoArr, accessToken }: ModalProps) => {
  const [songArr, setSongArr] = useState<VideoInfo[]>();
  const [deleteId, setDeleteId] = useState<string>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const closeModal = () => {
    setModalOpen(false);
  };

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

  useEffect(() => {
    const songs = sessionStorage.getItem("songs");
    if (songs) {
      setSongArr(JSON.parse(songs));
    }
  }, [sessionStorage.getItem("songs")]);

  const createPlayList = async () => {
    let playlistId = "";
    if (inputRef.current !== null) {
      const playlistTitle =
        inputRef.current.value === "" ? "YPG" : inputRef.current.value;
      const data = createNewPlayList(playlistTitle, accessToken);
      playlistId = (await data).data.id;
    }
    if (songArr) {
      for (const id of songArr) {
        await addToPlayList(accessToken, playlistId, id.items[0].id.videoId);
      }
    }
  };
  useEffect(() => {
    const songObj = sessionStorage.getItem("songs");
    if (songObj) {
      const songArr: VideoInfo[] = JSON.parse(songObj);
      const deleteArr = songArr.filter(
        (e) => e.items[0].id.videoId !== deleteId
      );
      setSongArr(deleteArr);
      sessionStorage.setItem("songs", JSON.stringify(deleteArr));
    }
  }, [deleteId]);

  return (
    <ModalWrapper onClick={closeModal}>
      <ModalBody onClick={(e) => e.stopPropagation()}>
        {songArr?.length === 0 ? (
          <p style={{ fontWeight: 600, fontSize: "20px" }}>곡을 선택해주세요</p>
        ) : (
          <>
            <ContentDiv>
              {songArr?.map((e) => (
                <SongItem
                  src={e.items[0].snippet.thumbnails.default.url}
                  title={e.items[0].snippet.title.replaceAll("&#39;", "'")}
                  vid={e.items[0].id.videoId}
                  setDeleteId={setDeleteId}
                />
              ))}
            </ContentDiv>
            <InputWrapper>
              <StyledLabel>플레이리스트 제목을 입력해주세요</StyledLabel>
              <InputDiv>
                <StyledInput ref={inputRef} placeholder="ex) YPG" />
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
          </>
        )}
      </ModalBody>
    </ModalWrapper>
  );
};

export default Modal;
