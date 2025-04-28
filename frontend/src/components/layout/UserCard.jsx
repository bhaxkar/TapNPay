import { Link } from "react-router-dom";

const UserCard = ({ filteredUsers }) => {
  return filteredUsers.map((user) => (
    <li
      key={user._id}
      className="flex justify-between items-center bg-sky-50 p-5 rounded-2xl shadow-sm hover:shadow-md transition duration-300"
    >
      <div className="flex items-center space-x-4">
        <div className="h-12 w-12 bg-indigo-600 text-white flex items-center justify-center rounded-full font-semibold text-lg shadow">
          {user.firstName.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-lg font-medium text-sky-900">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-sm text-sky-600">{user.email}</p>
        </div>
      </div>
      <Link
        to={`/send?id=${user._id}&name=${user.firstName}${user.lastName}`}
        className="px-5 py-2 bg-sky-600 text-white font-medium rounded-xl hover:bg-sky-700 transition-all duration-200 shadow"
      >
        Send
      </Link>
    </li>
  ));
};

export default UserCard;
