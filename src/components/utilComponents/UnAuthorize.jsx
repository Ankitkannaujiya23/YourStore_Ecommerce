import {  useNavigate } from "react-router-dom";

const UnAuthorize = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full text-center">
        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-purple-500 text-white rounded-full text-3xl font-bold">
          ✖
        </div>
        <h1 className="mt-4 text-2xl font-bold text-gray-800">Access Denied</h1>
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center justify-center text-sm">
          🔒 You don't have permission to access this page.
        </div>
        <p className="mt-4 text-gray-600 text-sm">
          This area is restricted to administrators only. If you believe you should have access, please contact your system administrator or try logging in with an administrator account.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-md flex items-center gap-2"
          >
            ↶ Return to Home
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 text-purple-600 border border-purple-600 hover:bg-purple-50 rounded-lg shadow-md flex items-center gap-2"
          >
            🛂 Login as Admin
          </button>
        </div>
        <p className="mt-4 text-gray-500 text-sm">
          Need help? <a href="/support" className="text-purple-600 underline">Contact Support</a>
        </p>
        <p className="mt-4 text-gray-400 text-xs">&copy; 2023 Company Name. All rights reserved.</p>
      </div>
    </div>
  );
};

export default UnAuthorize;

