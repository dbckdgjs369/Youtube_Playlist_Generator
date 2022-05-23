import axios from "axios";
import React, { useState } from "react";
export default function GoogleLoginPage() {
  const [accessToken, setAccessToken] = useState("");
  const [playlistId, setPlaylistId] = useState("");
  const REDIRECT_URI = "http://localhost:3000";
  const API_ENDPOINT = "https://www.googleapis.com/youtube/v3/playlists";
  const videoId = "R9At2ICm4LQ";
  const authorization_code = new URLSearchParams(window.location.search).get(
    "code"
  );
  async function getAccessToken() {
    const token = axios.post("https://oauth2.googleapis.com/token", {
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      code: authorization_code,
      grant_type: "authorization_code",
    });
    setAccessToken((await token).data.access_token);
  }

  async function makeNewPlayList() {
    console.log("access: " + accessToken);
    const title = "Hello";
    const description = "Hello";
    const add = axios.post(
      `${API_ENDPOINT}?access_token=${accessToken}&part=snippet,status&resource.snippet.title=${title}&resource.snippet.description=${description}`
    );
    setPlaylistId((await add).data.id);
  }
  function addToPlayList() {
    axios.post(
      `https://www.googleapis.com/youtube/v3/playlistItems?access_token=${accessToken}&part=snippet&resource.snippet.playlistId=${playlistId}&resource.snippet.resourceId.videoId=${videoId}&resource.snippet.resourceId.kind=youtube%23video`
    );
  }

  return (
    <div>
      <button onClick={getAccessToken}>get</button>
      {/* <a href="/"> */}
      <button onClick={makeNewPlayList}>add</button>
      <button onClick={addToPlayList}>addToPlayList</button>
      {/* </a> */}
    </div>
  );
}
