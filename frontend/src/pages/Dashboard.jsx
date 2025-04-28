import UserCard from "../components/layout/UserCard";
import useGetUsers from "../hooks/useGetUsers";
import UserCardShimmer from "../components/layout/UserCardShimmer";
import Pagination from "../components/layout/Pagination";

export default function Dashboard() {
  const {
    searchTerm,
    filteredUsers,
    isLoading,
    setSearchTerm,
    page,
    hasMorePages,
    nextPage,
    previousPage,
  } = useGetUsers();

  return (
    <div className="min-h-screen bg-indigo-50 p-4">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl p-8 space-y-8">
        <h1 className="text-3xl font-bold text-center text-sky-700">
          Send Money
        </h1>

        <div className="bg-gray-50 p-6 rounded-xl">
          <div className="flex items-center gap-4">
            <input
              className="flex-1 border border-indigo-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none rounded-xl px-5 py-3 text-base placeholder-indigo-600"
              placeholder="Search user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-6">
          {isLoading ? (
            <UserCardShimmer />
          ) : (
            <>
              {!isLoading && filteredUsers.length === 0 && searchTerm ? (
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <p className="text-sky-500 text-lg font-medium">
                    No users found.
                  </p>
                </div>
              ) : (
                <UserCard filteredUsers={filteredUsers} />
              )}
            </>
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
}
