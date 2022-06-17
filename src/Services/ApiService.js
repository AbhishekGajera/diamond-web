import axios from "axios";
export const getAllProduct = (callback, errorcallback) => {
  axios
    .get("http://localhost:8000/getproduct")
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