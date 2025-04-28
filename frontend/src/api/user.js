import { axiosInstance } from "./index.js";

export const signup = async (data) => {
  try {
    const response = await axiosInstance.post("/user/signup", data);
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
};

export const login = async (data) => {
  try {
    const response = await axiosInstance.post("/user/login", data);
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.error("Error during signin:", error);
    throw error;
  }
};

export const getUsers = async (searchTerm, page, limit) => {
  try {
    const response = await axiosInstance.get(`/user/users`, {
      params: {
        filter: searchTerm,
        page,
        limit,
      },
    });
    return {
      users: response.data.users,
      hasNextPage: response.data.hasNextPage,
      hasPreviousPage: response.data.hasPreviousPage,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getLoggedInUser = async () => {
  try {
    const response = await axiosInstance.get("/user/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching loggedIn user:", error);
    throw error;
  }
};

export const updateUserDetails = async (data) => {
  try {
    const response = await axiosInstance.put("/user/update", data);
    return response.data;
  } catch (error) {
    console.error("Error updating user details");
    throw error;
  }
};
