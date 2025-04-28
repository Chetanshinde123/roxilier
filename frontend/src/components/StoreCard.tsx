// src/components/StoreCard.tsx
import { useState } from "react";

interface StoreCardProps {
  id: string;
  name: string;
  address: string;
  overallRating: number;
  userRating?: number;
  onSubmitRating: (storeId: string, rating: number) => void;
}

const StoreCard = ({ id, name, address, overallRating, userRating, onSubmitRating }: StoreCardProps) => {
  const [rating, setRating] = useState(userRating || 0);

  const handleSubmit = () => {
    if (rating >= 1 && rating <= 5) {
      onSubmitRating(id, rating);
    } else {
      alert("Please select a rating between 1 and 5.");
    }
  };

  return (
    <div className="border p-4 rounded shadow-md mb-4">
      <h2 className="text-lg font-bold">{name}</h2>
      <p>{address}</p>
      <p>Overall Rating: {overallRating}</p>
      <div className="flex items-center mt-2">
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          min={1}
          max={5}
          className="border rounded w-20 p-1 mr-2"
        />
        <button onClick={handleSubmit} className="bg-green-500 text-white px-3 py-1 rounded">
          {userRating ? "Update Rating" : "Submit Rating"}
        </button>
      </div>
    </div>
  );
};

export default StoreCard;
