import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../store/UserInfoContext";
import styled from "@emotion/styled";
import axios from "axios";
import Button from "components/Button/Button";
import { makeList } from "../../utils/removeTime";
import SelectBox from "components/SelectBox/SelectBox";
import { text } from "styles/theme";
import { addToPlayList, createNewPlayList } from "apis/Playlist/playlist";
import { searchVideo } from "apis/Video/video";
import Loading from "components/Loading/Loading";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 50px;
  margin-top: 30px;
  /* opacity: 0.5; */
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

type id = {
  kind: "youtube#searchListResponse";
  etag: "9FM6D7uLfWa0rv-TAYGrqlG9IqE";
  nextPageToken: "CAEQAA";
  regionCode: "KR";
  pageInfo: {
    totalResults: 1000000;
    resultsPerPage: 1;
  };
  items: [
    {
      kind: "youtube#searchResult";
      etag: "KK6FVSJX7mGZrqI3d2gb9WgPgJA";
      id: {
        kind: "youtube#video";
        videoId: "pC7Z0TnvIs0";
      };
      snippet: {
        publishedAt: "2021-06-01T06:54:19Z";
        channelId: "UCeYzCeywt-0vT-lReSNxK0Q";
        title: "JOY (조이) – Hello (안녕) Lyrics (Color Coded Han/Rom/Eng)";
        description: "Artist: JOY (조이) Song: Hello (안녕) Album: 'Hello' Solo Debut Special Album Lyrics: ColorCodedLyrics (from ...";
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/pC7Z0TnvIs0/default.jpg";
            width: 120;
            height: 90;
          };
          medium: {
            url: "https://i.ytimg.com/vi/pC7Z0TnvIs0/mqdefault.jpg";
            width: 320;
            height: 180;
          };
          high: {
            url: "https://i.ytimg.com/vi/pC7Z0TnvIs0/hqdefault.jpg";
            width: 480;
            height: 360;
          };
        };
        channelTitle: "lovelyeonwoo";
        liveBroadcastContent: "none";
        publishTime: "2021-06-01T06:54:19Z";
      };
    }
  ];
};

export default function MakePlayListPage() {
  const [authorizationCode, setAuthorizationCode] = useState("");
  const [songList, setSongList] = useState<string[]>([]);
  const REDIRECT_URI = "http://localhost:3000/create";
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { accessToken, setAccessToken } = useContext(UserContext);
  const [mode, setMode] = useState<ModeProps>("generate");
  const [checkValue, setCheckValue] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    key: process.env.REACT_APP_YOUTUBE_API_KEY,
    part: "snippet",
    q: "",
    maxResults: 1,
    type: "video",
  });
  const [idArr, setIdArr] = useState<id[]>([]);

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

  // const createPlayList = async () => {
  //   console.log(accessToken);
  //   let playlistId = "";
  //   if (inputRef.current) {
  //     const data = createNewPlayList(inputRef.current.value, accessToken);
  //     playlistId = (await data).data.id;
  //     console.log(playlistId);
  //   }
  //   // for (const song of checkValue) {
  //   //   params.q = song;
  //   //   const data = await searchVideo(params);
  //   //   const vid = data.items[0].id.videoId;
  //   //   setLoading(true);
  //   //   try {
  //   //     setTimeout(() => {
  //   //       setLoading(false);
  //   //       addToPlayList(accessToken, playlistId, vid);
  //   //     }, 2000);
  //   //   } catch (error) {
  //   //     console.error(error);
  //   //   }
  //   // }

  //   for (const song of checkValue) {
  //     params.q = song;
  //     await searchVideo(params).then((res) =>
  //       addToPlayList(accessToken, playlistId, res.items[0].id.videoId)
  //     );
  //   }

  //   // const promiseArr = checkValue.map((song) => {
  //   //   params.q = song;
  //   //   searchVideo(params).then((res) => res.json());
  //   // });
  //   // await Promise.all(promiseArr);
  //   // const promsieArr = todoIdList.map((id) =>
  //   //   fetch(`https://jsonplaceholder.typicode.com/todos/${id}`).then((res) =>
  //   //     res.json()
  //   //   )
  //   // );
  //   // console.log(promsieArr);
  //   // const result = await Promise.all(promsieArr);

  //   // const promiseResult = checkValue.map((song) => {
  //   //   params.q = song;
  //   //   return searchVideo(params);
  //   // });
  //   // const result = await Promise.all(promiseResult).then((res) =>
  //   //   res.forEach((e) =>
  //   //     addToPlayList(accessToken, playlistId, e.items[0].id.videoId)
  //   //   )
  //   // );
  // };
  const createPlayList = async () => {
    let playlistId = "";
    if (inputRef.current) {
      const data = createNewPlayList(inputRef.current.value, accessToken);
      playlistId = (await data).data.id;
      console.log(playlistId);
    }

    for (const id of idArr) {
      await addToPlayList(accessToken, playlistId, id.items[0].id.videoId);
    }
  };
  const getIdArr = async () => {
    const promiseResult = checkValue.map((song) => {
      params.q = song;
      return searchVideo(params);
    });
    const result = await Promise.all(promiseResult);
    console.log(result);
    setIdArr(result);
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
        <Button buttonType="large" colorType="aqua" onClick={getIdArr}>
          곡 id 가져오기
        </Button>
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
            disabled={loading}
          >
            생성
          </Button>
        </InputDiv>
      </InputWrapper>
    </Wrapper>
  );
}
