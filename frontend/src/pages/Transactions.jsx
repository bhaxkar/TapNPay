import TransactionCard from "../components/layout/TransactionCard";
import UserCardShimmer from "../components/layout/UserCardShimmer";
import useTransactionHistory from "../hooks/useTransactionHistory";
import Pagination from "../components/layout/Pagination";

const Transactions = () => {
  const { transactions, loading, page, hasMorePages, nextPage, previousPage } =
    useTransactionHistory();
  const transactionsList = transactions?.transactions || [];

  return (
    <div className="min-h-screen bg-indigo-50 p-4">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl p-8 space-y-8">
        <h1 className="text-3xl font-bold text-center text-sky-700">
          Transaction History
        </h1>

        <div className="space-y-6">
          {loading ? (
            <UserCardShimmer />
          ) : (
            transactionsList.map((tx, idx) => (
              <TransactionCard key={idx} {...tx} />
            ))
          )}
        </div>

        <div className="flex justify-center">
          <Pagination
            page={page}
            hasMorePages={hasMorePages}
            nextPage={nextPage}
            previousPage={previousPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Transactions;
