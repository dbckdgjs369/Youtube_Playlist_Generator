import axios from "axios";

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
};

export { searchVideo };
