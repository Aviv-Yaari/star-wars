import axios from 'axios';

export const httpService = {
  get(endpoint, data) {
    return ajax(endpoint, 'GET', data);
  },
  post(endpoint, data) {
    return ajax(endpoint, 'POST', data);
  },
  put(endpoint, data) {
    return ajax(endpoint, 'PUT', data);
  },
  delete(endpoint, data) {
    return ajax(endpoint, 'DELETE', data);
  },
};

async function ajax(url, method = 'GET', data = null) {
  try {
    const res = await axios({
      url,
      method,
      data,
      params: method === 'GET' ? data : null,
    });
    return res.data;
  } catch (err) {
    console.error(`httpService error: method ${method}, url: ${url}`);
    console.dir(err);
    if (err.response && err.response.status === 401) {
      sessionStorage.clear();
      window.location.assign('/');
    }
    throw err;
  }
}
