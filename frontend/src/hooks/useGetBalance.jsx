import { useState } from "react";
import { getBalance } from "../api/account";
import toast from "react-hot-toast";

const useGetBalance = () => {
  const [balance, setBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkBalance = async () => {
    setIsLoading(true);
    try {
      const result = await getBalance();
      const formattedBalance = Number(result).toFixed(2);
      setBalance(formattedBalance);
    } catch (error) {
      console.error("Can't get Balance");
      setBalance(null);
      toast.error(error.response?.data?.message || "Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    balance,
    checkBalance,
    isLoading,
  };
};

export default useGetBalance;
