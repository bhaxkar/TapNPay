import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/user.js";
import toast from "react-hot-toast";

const useSignup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await signup({
        email,
        firstName,
        lastName,
        password,
      });
      toast.success(result.message);
      navigate("/");
    } catch (error) {
      console.error("Error while Sign Up", error);
      toast.error(
        error.response?.data?.message || "Failed to Signup. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    firstName,
    lastName,
    email,
    password,
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
    handleSubmit,
    isLoading,
  };
};

export default useSignup;
