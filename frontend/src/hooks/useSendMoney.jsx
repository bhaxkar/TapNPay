import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { sendMoney } from "../api/account";
import toast from "react-hot-toast";

const useSendMoney = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  const [amount, setAmmount] = useState(0);
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await sendMoney({
        to: id,
        amount: Number(amount),
        note,
      });
      const transactionId = result.transactionId;
      toast.success(result.message || "Payment successfull");
      navigate(`/transaction/${transactionId}`);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Payment failed");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    name,
    amount,
    note,
    setAmmount,
    setNote,
    handleSubmit,
    isLoading,
  };
};

export default useSendMoney;
