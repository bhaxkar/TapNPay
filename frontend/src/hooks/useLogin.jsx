import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/user";
import toast from "react-hot-toast";

const useLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await login({
        email,
        password,
      });
      toast.success(result.message);
      navigate("/");
    } catch (error) {
      console.error("Error while SignIn", error);
      toast.error(
        error.response?.data?.message || "Failed to login. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    handleSubmit,
    isLoading,
  };
};

export default useLogin;
