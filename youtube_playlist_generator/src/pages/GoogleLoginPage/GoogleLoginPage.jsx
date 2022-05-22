import axios from "axios";
import React, { useState } from "react";
import GoogleLogin from "react-google-login";
export default function GoogleLoginPage() {
  const [accessToken, setAccessToken] = useState("");
  const responseGoogleS = (res) => {
    console.log("success!");
  };
  const responseGoogleF = (res) => {
    console.log("fail!");
  };
  const REDIRECT_URI = "http://localhost:3000/auth";
  console.log(window.location.href);
  //   const authorization_code = window.location.href.split("code=")[1];
  const authorization_code = new URLSearchParams(window.location.search).get(
    "code"
  );
  console.log(authorization_code);
  async function getAccessToken() {
    const token = axios.post("https://oauth2.googleapis.com/token", {
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      code: authorization_code,
      grant_type: "authorization_code",
    });

    // .then((res) =>
    //   axios.post(`https://www.googleapis.com/youtube/v3/playlists`, {
    //     part: "snippet,status",
    //     resource: {
    //       snippet: {
    //         title: "Test Playlist",
    //         description: "A private playlist created with the YouTube API",
    //       },
    //       status: {
    //         privacyStatus: "private",
    //       },
    //       access_token: res.data.access_token,
    //     },
    //   })
    // );

    // ("https://www.googleapis.com/youtube/v3/playlists?access_token=ya29.a0ARrdaM_ReVQKRpmVj5w6QJa8_JROqN894S4nxJakbALciipWHjC_09qNI0U6zqujYgREa1K_wDy74-i29sv-g4uZLo0UQ3-ErIsqg3q_1YhslvHsk0JdeuHzfwWX8ViGj_jhWP_ppyoly1x6x36p7Kaj5P_i");
    // const add = axios.post(
    //   `https://www.googleapis.com/youtube/v3/playlists?access_token=${
    //     (await token).data.access_token
    //   }`,
    //   {
    //     part: "snippet,status",
    //     resource: {
    //       snippet: {
    //         title: "TEST2",
    //         description: "API",
    //       },
    //     },
    //   } //&part=snippet,status&resource.snippet.title=Test&resource.snippet.description=using API`
    // );

    // console.log(await add);
    setAccessToken((await token).data.access_token);
  }

  async function addPlayList() {
    console.log("access: " + accessToken);
    const title = "Hello";
    const description = "Hello";
    const add = axios.post(
      `https://www.googleapis.com/youtube/v3/playlists?access_token=${accessToken}&part=snippet,status&resource.snippet.title=${title}&resource.snippet.description=${description}`
    );
    console.log(add);
  }

  return (
    <div>
      {authorization_code}
      <button onClick={getAccessToken}>get</button>
      <a href="/">
        <button onClick={addPlayList}>add</button>
      </a>
    </div>
  );
}
