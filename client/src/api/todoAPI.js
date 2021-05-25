import axiosClient from 'api/axiosClient'

const baseURL = 'http://localhost:3000'

class TodoAPI {
  getAll = (params) => {
    const url = `${baseURL}/todos`;
    return axiosClient.get(url, { params });
  };
}

const todoAPI = new TodoAPI();

export default todoAPI