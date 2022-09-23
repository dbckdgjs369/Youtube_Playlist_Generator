import axios from "axios";
import { useQuery } from "react-query";

const REDIRECT_URI = "http://localhost:3000";

const getAuth = async ({ client_id, client_secret, redirec }) => {
  return axios.post("googleLogin", {});
};

const getAccessToken = async ({}) => {
  return axios.post("AccessToken");
};

const getLogin = async ({}) => {
  return axios.post("login");
};

export { getAuth, getAccessToken, getLogin };
