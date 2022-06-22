import axios from "axios";
export const getAllProduct = (callback, errorcallback) => {
  axios
    .get(`${process.env.REACT_APP_API_URL}/getproduct`)
    .then((res) => {
      if (callback != null) {
        callback(res);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
};