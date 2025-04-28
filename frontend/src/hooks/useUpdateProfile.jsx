import { useState, useEffect } from "react";
import { updateUserDetails } from "../api/user";
import { useUser } from "../context/UserContext";
import useCurrentUser from "./useCurrentUser";
import toast from "react-hot-toast";

const useUpdateProfile = () => {
  const { user } = useUser();
  const { getCurrentUser } = useCurrentUser();
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
    }
  }, [user]);

  const handleUpdate = async () => {
    setIsUpdating(true);

    try {
      const updatedUser = await updateUserDetails({
        firstName,
        lastName,
      });

      if (updatedUser && updatedUser.user) {
        await getCurrentUser();

        setIsEditing(false);
      }
      toast.success(
        updatedUser.message || "User's details updated successfully"
      );
    } catch (error) {
      console.error("Error while updating user details:", error);
      toast.error(
        error.response?.data?.message || "Can't update user's details"
      );
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    isEditing,
    firstName,
    lastName,
    setFirstName,
    setLastName,
    setIsEditing,
    handleUpdate,
    isUpdating,
  };
};

export default useUpdateProfile;
