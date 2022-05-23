import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Authorize from "../Authorize/Authorize";
import "./style.scss";

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const API_END_POINT = "https://accounts.google.com/o/oauth2/auth";
const REDIRECT_URI = "http://localhost:3000";
const SCOPE = "https://www.googleapis.com/auth/youtube";
const url = `${API_END_POINT}?access_type=offline&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}`;
const access_token_url = `https://oauth2.googleapis.com/token?code=${API_KEY}&clientid=${process.env.REACT_APP_CLIENT_ID}&clientsecret=${process.env.REACT_APP_CLIENT_SECRET}&redirect_uri=${REDIRECT_URI}&grant_type=authorization_code`;

const scopes = [
  "https://www.googleapis.com/auth/youtube",
  "https://www.googleapis.com/auth/youtube.force-ssl",
  "https://www.googleapis.com/auth/youtube.readonly",
  "https://www.googleapis.com/auth/youtubepartner",
];
const resultArr = [];

const DUMMY_VIDEO_ID_DATA = [
  "HsZZMU4nm3U",
  "Jh4QFaPmdss",
  "R9At2ICm4LQ",
  "3GWscde8rM8",
  "xbLbHjeOvMo",
];

export default function ListModal(props) {
  const { open, close } = props;
  const list = props.children;
  const songList = [];
  list.forEach((element) => {
    const temp = element.props.children;
    if (temp !== undefined) {
      songList.push(temp[1]);
    }
  });
  // console.log(songList);
  // let songIdList = [];
  const temp = [];
  const [songIdList, setsongIdList] = useState([]);
  const [query, setQuery] = useState("");
  const [params, setParams] = useState({
    key: process.env.REACT_APP_YOUTUBE_API_KEY,
    part: "snippet",
    q: `${query}`,
    maxResults: 1,
    type: "video",
  });
  async function getSearchResult() {
    songList.forEach(async (e) => {
      params.q = e;
      await axios
        .get("https://www.googleapis.com/youtube/v3/search", {
          params,
        })
        .then((res) => songIdList.push(res.data.items[0].id.videoId));
      // songIdList.push(videoId);
    });
    // songIdList = new Set(...songIdList);
    setsongIdList([...new Set(songIdList)]);
    // set = [...new Set(songIdList)];
    console.log(await songIdList);
    return;
  }

  return (
    <div className={open ? "openedModal" : "modal"}>
      {open ? (
        <div className="modalBox">
          <header>
            <button className="close" onClick={close}>
              close
            </button>
          </header>
          <div className="contents">{props.children}</div>
          <div>
            <button class="createBtn" onClick={() => getSearchResult()}>
              Create!
            </button>
            <button className="closeBtn" onClick={close}>
              close
            </button>
            <button className="allBtn">All</button>
            <a href={url}>
              <button>login</button>
            </a>
          </div>
          <div>
            <Authorize songIdList={songIdList} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
