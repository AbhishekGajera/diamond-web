import axios from "axios";
export const getAllProduct = (callback, errorcallback) => {
  axios
    .get("http://167.99.13.120:8001/getproduct")
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