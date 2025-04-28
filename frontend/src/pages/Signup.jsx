import Heading from "../components/common/Heading";
import SubHeading from "../components/common/SubHeading";
import InputBox from "../components/common/InputBox";
import Button from "../components/common/Button";
import AuthRedirectPrompt from "../components/common/AuthRedirectPrompt";
import useSignup from "../hooks/useSignup";

const Signup = () => {
  const {
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
  } = useSignup();

  return (
    <div className="min-h-screen bg-indigo-50 p-4">
      <div className="max-w-xl mx-auto bg-white shadow-2xl rounded-3xl p-8 space-y-8">
        <h1 className="text-3xl font-bold text-center text-sky-700">Sign Up</h1>
        <p className="text-center text-gray-600">
          Join us for seamless payments.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-xl space-y-4">
            <InputBox
              label="First Name"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={isLoading}
            />
            <InputBox
              label="Last Name"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={isLoading}
            />
            <InputBox
              label="Email"
              placeholder="john@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
            <InputBox
              label="Password"
              placeholder="● ● ● ● ●"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-center">
            <Button
              label={isLoading ? "Signing Up..." : "Sign Up"}
              disabled={isLoading}
            />
          </div>

          <div className="text-center">
            <AuthRedirectPrompt
              label="Already have an account?"
              redirectedRouteName="Sign In"
              to="/login"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
