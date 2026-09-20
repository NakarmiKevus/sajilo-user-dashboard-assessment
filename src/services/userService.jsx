import axios from "axios";

const BASE_URL = "https://dummyjson.com/users";

export async function getAllUsers() {
  const response = await axios.get(`${BASE_URL}?limit=0`);
  return response.data;
}

export async function getUserById(id) {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
}
