import axios from "axios";

const apiClient = axios.create({
  baseURL:
    "https://cors-container.herokuapp.com/https://api.tradilio.in/external",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  // async getShare(pageNumber = 1) {
  //   await apiClient
  //     .get(`/companies?page=${pageNumber}`)
  //     .then(response => {
  //       // commit("SET_TRADILIO_SHARES", response.data);
  //       console.log(":-D shares:", response.data.data);
  //       console.log(":-D tp:", response.data.total_pages);
  //       return response.data;
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // },
  getShare2(pageNumber) {
    return apiClient.get(`/companies?page=${pageNumber}`);
  }
  // async scrapeShares(pageNumber = 1) {
  //   await apiClient.get(`/companies?page=${pageNumber}`).then(response => {
  //     console.log(response.data.data);
  //     return response.data;
  //   });

  //   // let scrapedShares = [];
  //   // await this.getShare(1).then(firstCall => {
  //   //   scrapedShares.push(firstCall);
  //   //   let total_pages = firstCall.total_pages;
  //   //   console.log("scrapedShares", scrapedShares);
  //   //   console.log("firstCall", firstCall);
  //   //   for (var i = 2; i < total_pages - 90; i++) {
  //   //     scrapedShares.push(this.getShare(i));
  //   //     console.log(scrapedShares);
  //   //   }
  //   //   return scrapedShares;
  //   // });
  // }
};
