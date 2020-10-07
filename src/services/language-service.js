import config from "../config";
import TokenService from "./token-service";

const ApiService = {
  getLanguage() {
    return fetch(`${config.API_ENDPOINT}/language/`, {
      headers: {
        "authorization": `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getHead() {
    return fetch(`${config.API_ENDPOINT}/language/head`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      }
    }).then((res) => 
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  }
};
export default ApiService;
