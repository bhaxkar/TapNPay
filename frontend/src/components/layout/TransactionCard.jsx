import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const TransactionCard = ({ id, amount, type, fromUser, toUser, timestamp }) => {
  const isCredit = type === "CREDIT";

  return (
    <Link
      to={`/transaction/${id}`}
      className="bg-white rounded-2xl shadow-md p-4 flex justify-between items-center hover:shadow-lg transition-all"
    >
      <div className="flex gap-2">
        {isCredit ? (
          <>
            <h2 className="h-12 w-12 bg-indigo-600 text-white flex items-center justify-center rounded-full font-semibold text-lg shadow">
              {fromUser.charAt(0)}
            </h2>
            <div>
              <h2 className="text-lg font-semibold">{fromUser}</h2>
              <p className="text-sm text-gray-400">{timestamp.split("T")[0]}</p>
            </div>
          </>
        ) : (
          <>
            <h2 className="h-12 w-12 bg-indigo-600 text-white flex items-center justify-center rounded-full font-semibold text-lg shadow">
              {toUser.charAt(0)}
            </h2>
            <div>
              <h2 className="text-lg font-semibold">{toUser}</h2>
              <p className="text-sm text-gray-400">{timestamp.split("T")[0]}</p>
            </div>
          </>
        )}
      </div>
      <div className="text-right">
        <div
          className={`text-lg font-bold ${
            isCredit ? "text-green-500" : "text-red-500"
          }`}
        >
          {isCredit ? "+" : "-"}${amount.toFixed(2)}
        </div>
        <div className="flex items-center justify-end text-sm text-gray-400">
          {isCredit ? (
            <FaArrowDown className="w-4 h-4 mr-1" />
          ) : (
            <FaArrowUp className="w-4 h-4 mr-1" />
          )}
          {isCredit ? "Credit" : "Debit"}
        </div>
      </div>
    </Link>
  );
};

export default TransactionCard;
