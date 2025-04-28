import { useState, useEffect } from "react";
import { getTransactionHistory } from "../api/account";
import toast from "react-hot-toast";

const useTransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(false);
  const TXN_PER_PAGE = 5;

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const data = await getTransactionHistory(page, TXN_PER_PAGE);

      setTransactions(data);
      setHasMorePages(!!data.hasNextPage);
    } catch (error) {
      console.error("Can't fetch transaction history");
      toast.error(
        error.response?.data?.message || "Can't fetch transaction history"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [page]);

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const previousPage = () => {
    setPage((prev) => Math.max(1, prev - 1));
  };

  return {
    transactions,
    loading,
    page,
    hasMorePages,
    nextPage,
    previousPage,
  };
};

export default useTransactionHistory;
