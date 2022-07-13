import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
export default function GoogleLoginPage(props) {
  const [accessToken, setAccessToken] = useState("");
  const [playlistId, setPlaylistId] = useState("");
  const [playlistName, setPlaylistName] = useState("YPG");
  const REDIRECT_URI = "http://localhost:3000";
  const API_ENDPOINT = "https://www.googleapis.com/youtube/v3/playlists";
  const authorization_code = new URLSearchParams(window.location.search).get(
    "code"
  );
  console.log(accessToken);
  console.log(props.songIdList);
  const test = () => {
    console.log(props.songIdList);
  };
  async function getAccessToken() {
    const token = axios.post("https://oauth2.googleapis.com/token", {
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      code: authorization_code,
      grant_type: "authorization_code",
    });
    setAccessToken((await token).data.access_token);
    console.log(authorization_code);
    console.log(accessToken);
  }

  async function makeNewPlayList() {
    console.log("access: " + accessToken);
    const description = "Youtube Playlist Generator";
    const add = axios.post(
      `${API_ENDPOINT}?access_token=${accessToken}&part=snippet,status&resource.snippet.title=${playlistName}&resource.snippet.description=${description}`
    );
    setPlaylistId((await add).data.id);
  }
  function addToPlayList() {
    console.log(props.songIdList);
    console.log(accessToken);
    props.songIdList.forEach((element) =>
      axios.post(
        `https://www.googleapis.com/youtube/v3/playlistItems?access_token=${accessToken}&part=snippet&resource.snippet.playlistId=${playlistId}&resource.snippet.resourceId.videoId=${element}&resource.snippet.resourceId.kind=youtube%23video`
      )
    );
  }

  return (
    <div>
      <button onClick={test}>test</button>
      <button onClick={getAccessToken}>get AccessToken</button>
      <br />
      <label>playlist 이름을 입력해주세요</label>
      <br />
      <input onChange={(e) => setPlaylistName(e.target.value)} />
      <button onClick={makeNewPlayList}>add</button>
      <br />
      <button onClick={addToPlayList}>addToPlayList</button>
    </div>
  );
}
