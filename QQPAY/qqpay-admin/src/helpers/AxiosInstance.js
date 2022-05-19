import Axios from 'axios';
import { accessToken } from "./sessionKey";

const API_ROOT = process.env.VUE_APP_SERVER_ENDPOINT


//create axios instance
export const instance = Axios.create({
  baseURL: `${API_ROOT}`,
  headers: {
    "Content-Type": "application/json",
  },
});


//get data from api
export const getApiData = async (url, param = null) => {
  let response;
  try {
    response = await instance({
      method: "GET",
      url: `${url}`,
      params: param,
      headers: {
        Authorization: `bearer ${accessToken()}`,
      },
      transformResponse: [function (responseData) {
        // Do whatever you want to transform the data
        return JSON.parse(responseData);
      }],
    });
  } catch (e) {
    return e.response;
  }
  return response;
}

//post data to api
export const postApiData = async (data) => {
  const { url, formData } = data;
  let response;
  try {
    response = await instance({
      method: "POST",
      url: `${url}`,
      data: formData,
      headers: {
        Authorization: `bearer ${accessToken()}`,
      },
      transformResponse: [function (responseData) {
        //Do whatever you want to transform the data
        return JSON.parse(responseData);
      }],
    });
  } catch (e) {
    return e.response;
  }
  return response;
}

//post data to api
export const postApiDataNoAuth = async (data) => {
  const { url, formData } = data;
  let response;
  try {
    response = await instance({
      method: "POST",
      url: `${url}`,
      data: formData,
      headers: {
        // Authorization: `bearer ${accessToken()}`,
      },
      transformResponse: [function (responseData) {
        //Do whatever you want to transform the data
        return JSON.parse(responseData);
      }],
    });
  } catch (e) {
    return e.response
  }
  return response;
}

//update data
export const putApiData = async (data) => {
  const { url, formData } = data;
  let response;
  try {
    response = await instance({
      method: "PUT",
      url: `${url}`,
      data: formData,
      headers: {
        Authorization: `bearer ${accessToken()}`,
      },
      transformResponse: [function (responseData) {
        //Do whatever you want to transform the data
        return JSON.parse(responseData);
      }],
    });
  } catch (e) {
    // console.log(e.response, 'response')
    return e.response;
  }
  return response
}


//delete data
export const deleteApiData = async (url) => {
  let response;
  response = await instance({
    method: "DELETE",
    url: url,
    // params: param,
    headers: {
      Authorization: `bearer ${accessToken()}`,
    },
  });
  return response;
};

//delete bulk data
export const bulkDeleteApiData = async (data) => {
  const { url, formData } = data;
  let response;
  response = await instance({
    method: "DELETE",
    url: `${url}`,
    data: formData,
    // params: param,
    headers: {
      Authorization: `bearer ${accessToken()}`,
    },
  });
  return response;
};

//update data
export const patchApiData = async (data) => {
  const { url, formData } = data;
  let response;
  try {
    response = await instance({
      method: "PATCH",
      url: `${url}`,
      data: formData,
      headers: {
        Authorization: `bearer ${accessToken()}`,
      },
      transformResponse: [function (responseData) {
        //Do whatever you want to transform the data
        return JSON.parse(responseData);
      }],
    });
  } catch (e) {
    return e.response;
  }
  return response
}


export const downloadApiData = async (url, fileName) => {
  let response;
  try {
    response = await instance({
      method: "POST",
      url: url,
      responseType: 'blob',
      headers: {
        Authorization: `bearer ${accessToken()}`,
      },
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  } catch (error) {
    console.log(error.response)
    return error.response;
  }
  return response;
};