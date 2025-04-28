// src/pages/OwnerDashboard.tsx
import { useEffect, useState } from "react";
import api from "../services/api.ts";

const OwnerDashboard = () => {
  const [store, setStore] = useState<any>(null);

  useEffect(() => {
    fetchStoreData();
  }, []);

  const fetchStoreData = async () => {
    const { data } = await api.get("/owner/store");
    setStore(data);
  };

  if (!store) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Store</h2>
      <p><strong>Store Name:</strong> {store.name}</p>
      <p><strong>Average Rating:</strong> {store.averageRating}</p>

      <h3 className="text-xl font-semibold mt-6 mb-2">User Ratings</h3>
      <ul className="list-disc ml-6">
        {store.ratings.map((rating: any) => (
          <li key={rating.userId}>
            {rating.userName}: {rating.value} ⭐
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OwnerDashboard;
