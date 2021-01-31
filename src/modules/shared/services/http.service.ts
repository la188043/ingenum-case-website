import config from '../config';

const exec = (endpoint: string, method: string, body?: any) =>
  fetch(`${config.apiUrl}${endpoint}`, {
    method,
    body,
    headers: { 'Content-Type': 'application/json' },
  }).then(async result => {
    const text = await result.text();

    if (!text) {
      if (!result.ok) {
        throw new Error();
      }

      return text;
    }

    const response = JSON.parse(text);
    if (!result.ok) {
      throw response;
    }

    return response;
  });

const get = (endpoint: string, headers?: Headers) =>
  exec(endpoint, 'GET', headers);

const post = (endpoint: string, body: any, headers?: Headers) =>
  exec(endpoint, 'POST', body);

const put = (endpoint: string, body: any, headers?: Headers) =>
  exec(endpoint, 'PUT', body);

const remove = (endpoint: string, headers?: Headers) =>
  exec(endpoint, 'DELETE');

export default {
  get,
  post,
  put,
  remove,
};
