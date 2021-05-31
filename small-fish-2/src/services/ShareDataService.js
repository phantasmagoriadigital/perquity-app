import axios from "axios";

const apiClient = axios.create({
  baseURL:
    "https://spreadsheets.google.com/feeds/cells/" +
    "1ZHjmvPAMGqkngxk9MWkHafBNaItfxaiTKRluqA9ZjtA" +
    "/" +
    "1" +
    "/public/full?alt=json",
  withCredentials: false
});

export default {
  getShares() {
    return apiClient.get();
  }
};
