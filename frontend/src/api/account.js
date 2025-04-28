import { axiosInstance } from "./index.js";

export const getBalance = async () => {
  try {
    const response = await axiosInstance.get("/account/balance");
    return response.data.balance;
  } catch (error) {
    console.error("Error fetching balance", error);
    throw error;
  }
};

export const sendMoney = async (data) => {
  try {
    const response = await axiosInstance.post("/account/transfer", data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Transfer failed:", error);
    throw error;
  }
};

export const getTransactionHistory = async (page, limit) => {
  try {
    const response = await axiosInstance.get("/account/transactions", {
      params:{
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching transaction histroy");
    throw error;
  }
};

export const getTransactionDetails = async(transactionId) => {
  try {
    const response = await axiosInstance.get(`/account/transaction/${transactionId}`)
    return response.data;
  } catch (error) {
    console.error("Error fetching transaction details");
    throw error;
  }
}
