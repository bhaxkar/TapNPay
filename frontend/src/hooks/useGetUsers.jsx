import { useState, useEffect, useCallback } from "react";
import { getUsers } from "../api/user";
import toast from "react-hot-toast";

const useGetUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(false);
  const USERS_PER_PAGE = 5;

  const filterUser = useCallback(async () => {
    setIsLoading(true);

    try {
      const result = await getUsers(searchTerm, page, USERS_PER_PAGE);
      setFilteredUsers(result.users);
      setHasMorePages(!!result.hasNextPage);
    } catch (error) {
      console.log("Failed to fetch Users", error);
      setFilteredUsers([]);
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch Users. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, page]);

  useEffect(() => {
    filterUser();
  }, [searchTerm, page, filterUser]);

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const previousPage = () => {
    setPage((prev) => Math.max(1, prev - 1));
  };

  return {
    searchTerm,
    filteredUsers,
    isLoading,
    setSearchTerm,
    filterUser,
    page,
    hasMorePages,
    nextPage,
    previousPage,
  };
};

export default useGetUsers;
