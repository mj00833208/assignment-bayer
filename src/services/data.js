import axios from "axios";
import consts from "../const";

const dataService = {};

dataService.import = (payload = {}) => {
  return new Promise((resolve, reject) => {
    return axios
      .post(`${consts.API_URL}/import`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  }).catch((err) => {
    console.log(err);
  });
};

dataService.fetchData = (payload = {}) => {
  return new Promise((resolve, reject) => {
    return axios
      .post(`${consts.API_URL}/fetch`, payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  }).catch((err) => {
    console.log(err);
  });
};

export default dataService;
