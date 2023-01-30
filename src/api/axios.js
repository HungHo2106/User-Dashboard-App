import axios from "axios";

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getPhotos = async () => {
  const response = await api.get("/photos");
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const updateUserContact = async (id, data, action) => {
  try {
    const response = await api.put(`users/${id}`, { data });
    return response.status === 200 && response.data
      ? action(response.data)
      : action(null);
  } catch (error) {
    return Promise.reject(error);
  }
};
