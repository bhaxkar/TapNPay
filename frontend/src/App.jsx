import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContextProvider";
import { Toaster } from 'react-hot-toast';
import PrivateRoute from "./components/common/PrivateRoute";
import Navbar from "./components/layout/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import Transactions from "./pages/Transactions";
import TransactionDetails from "./pages/TransactionDetails";
import Error from "./pages/Error";


const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <main className=" bg-indigo-50">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/send" element={<PrivateRoute><SendMoney /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/transactions" element={<PrivateRoute><Transactions /></PrivateRoute>} />
          <Route path="/transaction/:transactionId" element={<PrivateRoute><TransactionDetails /></PrivateRoute>} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      <Toaster />
    </>
  );
};

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
