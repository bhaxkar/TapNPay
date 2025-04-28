import { useEffect } from "react";
import { getLoggedInUser } from "../api/user";
import { useUser } from "../context/UserContext";
import toast from "react-hot-toast";

const useCurrentUser = () => {
  const { user, setUser, loading, setLoading } = useUser();

  const getCurrentUser = async () => {
    setLoading(true);

    try {
      const result = await getLoggedInUser();
      setUser({
        firstName: result.firstName || "",
        lastName: result.lastName || "",
        email: result.email || "",
        createdAt: result.createdAt || "",
        id: result._id || "",
      });
    } catch (error) {
      console.error("User Not Authenticated", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch user info."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return { user, loading, getCurrentUser };
};

export default useCurrentUser;
