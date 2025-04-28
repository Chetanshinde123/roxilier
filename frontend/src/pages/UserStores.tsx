// src/pages/UserStores.tsx
import { useEffect, useState } from "react";
import api from "../services/api.ts";
import StoreCard from "../components/StoreCard";

const UserStores = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    const { data } = await api.get("/stores");
    setStores(data);
  };

  const submitRating = async (storeId: string, rating: number) => {
    await api.post(`/stores/${storeId}/rating`, { rating });
    fetchStores();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Stores</h2>
      {stores.map((store: any) => (
        <StoreCard
          key={store.id}
          id={store.id}
          name={store.name}
          address={store.address}
          overallRating={store.overallRating}
          userRating={store.userRating}
          onSubmitRating={submitRating}
        />
      ))}
    </div>
  );
};

export default UserStores;
