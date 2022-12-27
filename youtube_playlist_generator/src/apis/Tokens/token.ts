import { refreshType, accessType } from "types/token";
import axios from "axios";

const API_ENDPOINT = "https://oauth2.googleapis.com/token";
const REDIRECT_URI = "https://youtube-playlist-generator.vercel.app/create";

const getAccessToken = async ({ code }: accessType) => {
  const access_token = await axios.post(`${API_ENDPOINT}`, {
    client_id: process.env.REACT_APP_CLIENT_ID,
    client_secret: process.env.REACT_APP_CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
    code: code,
    grant_type: "authorization_code",
  });
  // .then((res) => res.data.access_token);
  return access_token;
};

const getAccessTokenByRefreshToken = async ({ refresh_token }: refreshType) => {
  const access_token = await axios
    .post(`${API_ENDPOINT}`, {
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      refresh_token: refresh_token,
      grant_type: "refresh_token",
    })
    .then((res) => res.data.access_token);
  return access_token;
};

export { getAccessToken, getAccessTokenByRefreshToken };
