import { Link } from "react-router-dom";

const AuthRedirectPrompt = ({ label, redirectedRouteName, to }) => {
  return (
    <div className="py-2 text-sm flex justify-center">
      <div>{label}</div>
      <Link to={to} className="pointer underline underline-offset-2 pl-1">
        {redirectedRouteName}
      </Link>
    </div>
  );
};

export default AuthRedirectPrompt;
