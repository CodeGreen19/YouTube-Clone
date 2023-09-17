import axios from "axios";
export const baseUrl = "https://youtube-v31.p.rapidapi.com";
export const fetchVideo = async (url) => {
  const options = {
    method: "GET",
    url: `${url}`,

    headers: {
      "X-RapidAPI-Key": "f3304bd9dfmsh69d9aa64e1e2b2bp1586a2jsn20e0bc026ffd",
      "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    },
  };

  const { data } = await axios.request(options);
  return data;
};
