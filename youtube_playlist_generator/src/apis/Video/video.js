import axios from "axios";

const searchVideo = async (params) => {
  console.log(params);
  const { data } = await axios({
    url: "/search",
    method: "GET",
    params,
  });
  return data.items[0].id.videoId;
};

export { searchVideo };
