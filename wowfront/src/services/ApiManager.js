import axios from "axios";
import { Component } from "react";

export default class ApiManager extends Component {
  static myInstance = null;
  baseUrl = process.env.REACT_APP_BASEURL;

  static getInstance() {
    if (ApiManager.myInstance == null) {
      ApiManager.myInstance = new ApiManager();
    }
    return this.myInstance;
  }

  get(url) {
    console.log(this.baseUrl + url)
    return axios.get(this.baseUrl + url, {
      withCredentials: true,
    });
  }

  post(url, data) {
    return axios.post(this.baseUrl + url, data, {
      withCredentials: true,
    });
  }
}
