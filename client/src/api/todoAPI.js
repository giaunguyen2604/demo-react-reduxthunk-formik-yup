import axiosClient from 'api/axiosClient'

const domain = 'https://gtn-todoapis.herokuapp.com'
const baseURL = `${domain}/todos`

class TodoAPI {
  getAll = (params) => {
    return axiosClient.get(baseURL, { params });
  };

  addTodo = (params) => {
    return axiosClient.post(baseURL, params)
  };

  updateTodo = (params) => {
    const url = `${baseURL}/${params.id}`;
    return axiosClient.patch(url, params)
  };

  deleteTodo = (params) => {
    const url = `${baseURL}/${params.id}`;
    return axiosClient.delete(url, params)
  };
}

const todoAPI = new TodoAPI();

export default todoAPI