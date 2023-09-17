import axios from "axios";
export const baseUrl = "https://youtube-v31.p.rapidapi.com";
export const fetchVideo = async (url) => {
  const options = {
    method: "GET",
    url: `${url}`,

    headers: {
      "X-RapidAPI-Key": "e439740084msh6e426929f396e3bp1226d6jsnd4ce65bb2edb",
      "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    },
  };

  const { data } = await axios.request(options);
  return data;
};
