// src/components/Navbar.tsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.tsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <div className="font-bold text-lg">Store Rating App</div>
      <div className="space-x-4">
        {user ? (
          <>
            {user.role === "admin" && <Link to="/admin/dashboard">Dashboard</Link>}
            {user.role === "user" && <Link to="/user/stores">Stores</Link>}
            {user.role === "owner" && <Link to="/owner/dashboard">My Store</Link>}
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
