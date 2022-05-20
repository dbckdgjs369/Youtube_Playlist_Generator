import React, { useState } from "react";
import axios from "axios";
import "./style.scss";

// import { useGoogleApi } from "react-gapi";

const API_END_POINT = "https://accounts.google.com/o/oauth2/auth";

const clientId =
  "583239101687-9t04pidco7vejdtcjac2qi0hccrag7m1.apps.googleusercontent.com";
const redirect_uri = "http://localhost:5000/callback";
const scopes = [
  "https://www.googleapis.com/auth/youtube",
  "https://www.googleapis.com/auth/youtube.force-ssl",
  "https://www.googleapis.com/auth/youtube.readonly",
  "https://www.googleapis.com/auth/youtubepartner",
];

async function getPermission() {
  const temp = await axios
    .post(
      `${API_END_POINT}?client_id=${clientId}&redirect_uri=${redirect_uri}&scope=https://www.googleapis.com/auth/youtube&
    response_type=code&
    access_type=offline`
    )
    .then((res) => console.log(res.data));
  console.log(temp);
}

// getPermission();

export default function ListModal(props) {
  const { open, close } = props;
  const list = props.children;
  const songList = [];
  list.forEach((element) => {
    const temp = element.props.children;
    if (temp !== undefined) {
      songList.push(temp[1]);
    } else {
      console.log("a"); //마지막에 undefined임
    }
  });
  console.log(songList);
  const resultArr = [];
  const [query, setQuery] = useState("");
  const [params, setParams] = useState({
    key: "AIzaSyBaVyI7nDvN5rWXhF-81tcfrFJUItYtjhM",
    part: "snippet",
    q: `${query}`,
    maxResults: 1,
    type: "video",
  });
  async function getSearchResult() {
    // songList.forEach((element) => {
    //   resultArr.push(
    //     axios
    //       .get("https://www.googleapis.com/youtube/v3/search", { element })
    //       .then((res) => res.data.items[0].id.videoId)
    //   );
    // });
    songList.forEach((element) => {
      setQuery(element); //q를 넣긴했는데
      console.log(params); //여기에 지금 적용이 안되고 있음
      const videoId = axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params,
        }
      );
      resultArr.push(videoId);
      // console.log(element);
    });
    // const videoId = axios
    //   .get("https://www.googleapis.com/youtube/v3/search", {
    //     params,
    //   })
    //   .then((res) => res.data.items[0].id.videoId);
    // resultArr.push(await videoId);
    // console.log(await videoId);
    // .then((res) => console.log(res));
    return;
  }
  console.log(resultArr);

  // async function createPlaylist() {
  //   const res = await fetch(
  //     `https://www.googleapis.com/youtube/v3/playlists"?key=AIzaSyBaVyI7nDvN5rWXhF-81tcfrFJUItYtjhM`
  //   );
  //   const data = await res.json();
  //   return props:{
  //     data
  //   }
  // }

  return (
    <div className={open ? "openedModal" : "modal"}>
      {open ? (
        <div className="modalBox">
          <header>
            <button className="close" onClick={close}>
              x
            </button>
          </header>
          <div className="contents">{props.children}</div>
          <footer>
            <button class="createBtn" onClick={() => getSearchResult()}>
              Create!
            </button>
            <button className="closeBtn" onClick={close}>
              close
            </button>
            <button className="allBtn">All</button>
            <button onClick={() => getPermission()}>test</button>
          </footer>
        </div>
      ) : null}
    </div>
  );
}
