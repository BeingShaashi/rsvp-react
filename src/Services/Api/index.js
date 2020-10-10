import apiCore from "./core";
import sampleData from "./rsvps.json";

const API_URL = "//rsvp123.free.beeceptor.com";

const api = {};

api.register = (payload) => {
  const link = API_URL + "/register";
  return apiCore.post(link, payload);
};

api.getRsvps = async () => {
  // const link = API_URL + "/rsvp";
  // return apiCore.get(link);

  return { rsvps: sampleData, success: true };
};

api.getRsvp = async (query) => {
  // const link = API_URL + "/rsvp";
  // return apiCore.get(link, query);

  return {
    rsvp: sampleData?.filter((x) => x?._id?.$oid === query?._id)?.[0],
    success: true,
  };
};

export default api;
