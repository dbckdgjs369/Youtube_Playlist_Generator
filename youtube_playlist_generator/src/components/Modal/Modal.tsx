import styled from "@emotion/styled";
import { addToPlayList, createNewPlayList } from "apis/Playlist/playlist";
import Button from "components/Button/Button";
import { VideoInfo } from "types/video";
import { useEffect, useRef } from "react";
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
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  overflow: auto;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

const Modal = ({ setModalOpen, songInfoArr, accessToken }: ModalProps) => {
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
  const createPlayList = async () => {
    let playlistId = "";
    if (inputRef.current !== null) {
      const playlistTitle =
        inputRef.current.value === "" ? "YPG" : inputRef.current.value;
      const data = createNewPlayList(playlistTitle, accessToken);
      playlistId = (await data).data.id;
    }

    for (const id of songInfoArr) {
      await addToPlayList(accessToken, playlistId, id.items[0].id.videoId);
    }
  };

  return (
    <ModalWrapper onClick={closeModal}>
      <ModalBody onClick={(e) => e.stopPropagation()}>
        {songInfoArr.length === 0 ? (
          <p>선택된게 없네요</p>
        ) : (
          <>
            {songInfoArr.map((e) => (
              <SongItem
                src={e.items[0].snippet.thumbnails.default.url}
                title={e.items[0].snippet.title.replaceAll("&#39;", "'")}
              />
            ))}
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
