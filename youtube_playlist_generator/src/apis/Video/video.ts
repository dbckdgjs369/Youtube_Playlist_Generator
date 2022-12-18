import axios from "axios";

// const searchVideo = async (params) => {
//   console.log(params);
//   const { data } = await axios({
//     url: "/search",
//     method: "GET",
//     params,
//   });
//   return data.items[0].id.videoId;
// };
axios.defaults.baseURL = `https://www.googleapis.com/youtube/v3`;

interface ParamProps {
  key: string | undefined;
  part: string;
  q: string;
  maxResults: number;
  type: string;
}
const searchVideo = async (params: ParamProps) => {
  const { data } = await axios //이게 진짜 코드
    .get("/search", {
      params,
    });
  return data;
  // .then((res) => temp.push(res.data.items[0].id.videoId));
};

// const addToPlayList = async ({ params }) => {
//   const { data } = await axios({
//     url: "/playlistItems",
//     method: "POST",
//     params,
//   });
// };

export { searchVideo };
