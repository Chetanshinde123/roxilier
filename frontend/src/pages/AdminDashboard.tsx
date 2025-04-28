// src/pages/AdminDashboard.tsx
import { useEffect, useState } from "react";
import api from "../services/api.ts";
import UserTable from "../components/UserTable";
import StoreTable from "../components/StoreTable";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, stores: 0, ratings: 0 });
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    const { data: statData } = await api.get("/admin/stats");
    const { data: usersData } = await api.get("/admin/users");
    const { data: storesData } = await api.get("/admin/stores");
    setStats(statData);
    setUsers(usersData);
    setStores(storesData);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded shadow">Total Users: {stats.users}</div>
        <div className="bg-green-100 p-4 rounded shadow">Total Stores: {stats.stores}</div>
        <div className="bg-yellow-100 p-4 rounded shadow">Total Ratings: {stats.ratings}</div>
      </div>

      <h3 className="text-xl font-semibold mb-2">Users</h3>
      <UserTable users={users} />

      <h3 className="text-xl font-semibold mt-8 mb-2">Stores</h3>
      <StoreTable stores={stores} />
    </div>
  );
};

export default AdminDashboard;
