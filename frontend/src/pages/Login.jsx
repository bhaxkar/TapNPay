import Heading from "../components/common/Heading";
import SubHeading from "../components/common/SubHeading";
import InputBox from "../components/common/InputBox";
import Button from "../components/common/Button";
import AuthRedirectPrompt from "../components/common/AuthRedirectPrompt";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const { email, password, setEmail, setPassword, handleSubmit, isLoading } =
    useLogin();

  return (
    <div className="min-h-screen bg-indigo-50 p-4">
      <div className="max-w-xl mx-auto bg-white shadow-2xl rounded-3xl p-8 space-y-8">
        <h1 className="text-3xl font-bold text-center text-sky-700">Sign In</h1>
        <p className="text-center text-gray-600">
          Seamless spending starts here.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-xl space-y-4">
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
              label={isLoading ? "Signing In..." : "Sign In"}
              disabled={isLoading}
            />
          </div>

          <div className="text-center">
            <AuthRedirectPrompt
              label="Don't have an account?"
              redirectedRouteName="Sign Up"
              to="/signup"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
