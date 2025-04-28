import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTransactionDetails } from "../api/account";
import toast from "react-hot-toast";

const useTransactionDetail = () => {
  const { transactionId } = useParams();
  const [loading, setLoading] = useState(true);
  const [txnDetails, setTxnDetails] = useState({
    id: "",
    amount: "",
    type: "",
    note: "",
    fromUser: "",
    toUser: "",
    timestamp: "",
  });

  const fetchTransactionDetails = async () => {
    try {
      const result = await getTransactionDetails(transactionId);
      setTxnDetails({
        id: result.id,
        amount: result.amount,
        type: result.type,
        note: result.note,
        fromUser: result.fromUser,
        toUser: result.toUser,
        timestamp: result.timestamp,
      });
    } catch (error) {
      console.error("Can't fetch transaction details");
      toast.error(
        error.response?.data?.message || "Can't fetch transaction details"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (transactionId) {
      fetchTransactionDetails();
    }
  }, [transactionId]);

  return { txnDetails, loading };
};

export default useTransactionDetail;
