import axios from "axios";

let headers = {
  "Content-Type": "application/json",
};

const getErMsg = (error) => {
  let erroObj = error?.response?.data || {};

  return !(erroObj.message || error.message)
    ? "Something went wrong"
    : erroObj.message || error.message;
};

const api = {};

api.download = (link) => {
  window.location.href = link;
};

api.get = (uri, params) => {
  return axios
    .get(uri, {
      headers,
      params,
    })
    .then(async (response) => {
      return response.data;
    })
    .catch((error) => {
      error.message = getErMsg(error);
      throw error;
    });
};

api.post = (uri, payload) => {
  return axios
    .post(uri, payload, {
      headers,
    })
    .then(async (response) => {
      return response.data;
    })
    .catch((error) => {
      error.message = getErMsg(error);
      throw error;
    });
};

export default api;
