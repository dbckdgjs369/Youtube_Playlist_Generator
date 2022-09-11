import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../store/UserInfoContext";

const searchVideo = async (params) => {
  console.log(params);
  const { data } = await axios({
    url: "/search",
    method: "GET",
    params,
  });
  return data.items[0].id.videoId;
};
const addToPlayList = async ({ params }) => {
  const { data } = await axios({
    url: "/playlistItems",
    method: "POST",
    params,
  });
};

export { searchVideo };
