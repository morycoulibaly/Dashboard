import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-6">
        <span className="text-[15px] font-semibold tracking-tight text-gray-900">
          Dashboard
        </span>
        <button
          onClick={handleLogout}
          className="h-8 rounded-md border border-gray-200 px-3 text-[13px] font-medium text-gray-500 transition-colors hover:border-red-300 hover:text-red-500"
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
}

export default Navbar;