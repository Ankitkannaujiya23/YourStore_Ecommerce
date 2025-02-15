import axios from "axios";
import { API_URLS } from "./apiCalls";
const baseURL = process.env.BASE_URL || "http://localhost:5001/api";
console.log("base url", baseURL);
const token = window.localStorage.getItem("token");
//make api calls with axios interceptors
//here baseUrl for give api backend url and timeout for when api response is late
const axiosInterceptor = axios.create({
  baseURL,
  timeout: 15000,
  headers: { token },
});

axiosInterceptor.interceptors.request.use(
  //on success or fullfilled
  (config) => {
    config.headers.token = token;
    return config;
  },
  (error) => {
    return Promise.reject();
  }
);

axiosInterceptor.interceptors.response.use(
  (response) => {
    //stop global loader state
    return processResponse(response);
  },
  (error) => {
    return Promise.reject(processError(error));
  }
);

const processResponse = (response) => {
  if (response?.status === 200) {
    return { isSuccess: true, data: response };
  } else {
    return {
      isSuccess: false,
      statusCode: response?.status,
      message: response?.message,
    };
  }
};

const processError = (error) => {
  if (error?.response) {
    //request successfully send but server not give statuscode 200
    return {
      isSuccess: false,
      statusCode: error.response?.status,
      message: "An error occured.",
    };
  } else if (error?.reject) {
    // request send but no response was not received from server Network issue;
    return { isSuccess: false, statusCode: 400, message: "Bad Request" };
  } else {
    // something wrong in client side
    return {
      isSuccess: false,
      statusCode: 400,
      message: "Something went wrong.",
    };
  }
};

const API = {};

//here we have to loop our API_URLS

for (const [key, value] of Object.entries(API_URLS)) {
  //in loop we get each object which present in loop of API_URLS
  API[key] = (body, showUploadProgress, showDownloadProgress) =>
    //now here axiosInstance method which take an object
    axiosInterceptor({
      url: value.url,
      method: value.method,
      data: body,
      responseType: value.responseType,
      onUploadProgress: (progressEvent) => {
        if (showUploadProgress) {
          let percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showUploadProgress(percentageCompleted);
        }
      },
      onDownloadProgress: (progressEvent) => {
        if (showDownloadProgress) {
          let percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showDownloadProgress(percentageCompleted);
        }
      },
    });
}

export { API };
export default axiosInterceptor;
