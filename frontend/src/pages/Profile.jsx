import { ImSpinner9 } from "react-icons/im";
import { FiEdit } from "react-icons/fi";
import { MdAccountBalanceWallet } from "react-icons/md";
import useCurrentUser from "../hooks/useCurrentUser";
import useGetBalance from "../hooks/useGetBalance";
import useUpdateProfile from "../hooks/useUpdateProfile";

const Profile = () => {
  const { user, loading: userLoading } = useCurrentUser();
  const {
    isEditing,
    firstName,
    lastName,
    setFirstName,
    setLastName,
    setIsEditing,
    handleUpdate,
    isUpdating,
  } = useUpdateProfile();

  const { balance, isLoading: balanceLoading, checkBalance } = useGetBalance();

  if (userLoading) {
    return (
      <div className="flex flex-row min-h-screen justify-center items-center">
        <ImSpinner9 className="animate-spin text-2xl text-blue-700" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-50 p-4">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl p-8 space-y-8">
        <h1 className="text-3xl font-bold text-center text-sky-700">
          Profile Information
        </h1>

        <div className="space-y-2">
          <div className="bg-gray-50 p-2 rounded-xl">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name:
            </label>
            {isEditing ? (
              <div className="flex gap-4">
                <input
                  type="text"
                  className="flex-1 border border-indigo-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none rounded-xl px-5 py-3 text-base placeholder-indigo-600"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                />

                <input
                  type="text"
                  className="flex-1 border border-indigo-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none rounded-xl px-5 py-3 text-base placeholder-indigo-600"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                />
              </div>
            ) : (
              <p className="px-4 py-3 font-display font-bold text-lg text-gray-900 border-l-4 border-blue-500 bg-white rounded-r shadow-sm">
                {user.firstName} {user.lastName}
              </p>
            )}
          </div>

          <div className="bg-gray-50 p-2 rounded-xl">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email:
            </label>
            <p className="px-4 py-3 font-display font-bold text-lg text-gray-900 border-l-4 border-blue-500 bg-white rounded-r shadow-sm">
              {user.email}
            </p>
          </div>

          {user.createdAt && (
            <div className="bg-gray-50 p-2 rounded-xl">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Member Since:
              </label>
              <p className="px-4 py-3 font-display font-bold text-lg text-gray-900 border-l-4 border-blue-500 bg-white rounded-r shadow-sm">
                {user.createdAt.split("T")[0]}
              </p>
            </div>
          )}

          <div className="flex justify-end">
            {isEditing ? (
              <button
                onClick={handleUpdate}
                disabled={isUpdating}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors duration-200 flex items-center cursor-pointer disabled:opacity-50"
              >
                {isUpdating ? (
                  <ImSpinner9 className="animate-spin w-5 h-5 mr-2" />
                ) : (
                  <FiEdit className="w-5 h-5 mr-2" />
                )}
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors duration-200 flex items-center cursor-pointer"
              >
                <FiEdit className="w-5 h-5 mr-2" />
                Edit Profile
              </button>
            )}
          </div>

          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl p-6 shadow-lg">
            <div className="flex flex-col items-center space-y-4">
              <h3 className="text-xl font-semibold font-display">
                Wallet Balance
              </h3>

              {balance ? (
                <div className="text-center">
                  <p className="text-3xl font-bold text-indigo-50">{balance}</p>
                  <p className="text-sm text-gray-200 mt-1">
                    Available Balance
                  </p>
                </div>
              ) : (
                <button
                  onClick={checkBalance}
                  disabled={balanceLoading}
                  className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-medium hover:bg-gray-100 transition-colors duration-200 flex items-center cursor-pointer disabled:opacity-50"
                >
                  {balanceLoading ? (
                    <ImSpinner9 className="animate-spin w-5 h-5 mr-2" />
                  ) : (
                    <MdAccountBalanceWallet className="w-5 h-5 mr-2" />
                  )}
                  {balanceLoading ? "Loading..." : "Check Balance"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
