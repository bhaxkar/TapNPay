import { ImSpinner9 } from "react-icons/im";
import useTransactionDetail from "../hooks/useTransactionDetail";

const TransactionDetails = () => {
  const { txnDetails, loading } = useTransactionDetail();
  console.log(txnDetails);
  return (
    <div className="min-h-screen bg-indigo-50 p-4">
      {loading ? (
        <div className="flex flex-row min-h-screen justify-center items-center">
          <ImSpinner9 className="animate-spin text-2xl text-blue-700" />
        </div>
      ) : (
        <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl p-8 space-y-8">
          <h1 className="text-3xl font-bold text-center text-sky-700">
            Transaction Details
          </h1>

          <div className="bg-gray-100 p-6 rounded-xl space-y-6">
            <div className="flex justify-between items-center">
              <span
                className={`px-4 py-2 rounded-xl text-sm font-medium ${
                  txnDetails.type === "CREDIT"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {txnDetails.type}
              </span>
              <span className="text-gray-500 text-sm">
                {new Date(txnDetails.timestamp).toLocaleString()}
              </span>
            </div>

            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800">
                ₹{txnDetails.amount}
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                <span className="text-gray-600">Transaction ID</span>
                <span className="text-gray-800 font-medium">
                  {txnDetails.id}
                </span>
              </div>

              <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                <span className="text-gray-600">From</span>
                <span className="text-gray-800 font-medium">
                  {txnDetails.fromUser}
                </span>
              </div>

              <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                <span className="text-gray-600">To</span>
                <span className="text-gray-800 font-medium">
                  {txnDetails.toUser}
                </span>
              </div>

              {txnDetails.note && (
                <div className="p-4 bg-white rounded-xl">
                  <span className="text-gray-600 block mb-2">Note:</span>
                  <p className="text-gray-800">{txnDetails.note}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionDetails;
