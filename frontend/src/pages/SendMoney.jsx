import { useNavigate } from "react-router-dom";
import useSendMoney from "../hooks/useSendMoney";

const SendMoney = () => {
  const navigate = useNavigate();
  const { name, amount, note, setAmmount, setNote, handleSubmit, isLoading } =
    useSendMoney();

  return (
    <div className="min-h-screen bg-indigo-50 p-4">
      <div className="max-w-xl mx-auto bg-white shadow-2xl rounded-3xl p-8 space-y-8">
        <h1 className="text-3xl font-bold text-center text-sky-700">
          Send Money
        </h1>

        <div className="bg-gray-100 p-6 rounded-xl">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-indigo-600 text-white flex items-center justify-center rounded-full font-semibold text-lg">
              {name[0].toUpperCase()}
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900">{name}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-100 p-6 rounded-xl space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Amount (in ₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  ₹
                </span>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border border-indigo-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none rounded-xl"
                  placeholder="0.00"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="note"
                className="block text-sm font-medium text-gray-700"
              >
                Add a note (optional)
              </label>
              <textarea
                name="note"
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-4 py-3 border border-indigo-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none rounded-xl"
                placeholder="What's this payment for?"
                rows="3"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors duration-200"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SendMoney;
