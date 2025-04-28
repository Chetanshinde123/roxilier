// src/components/StoreTable.tsx
interface Store {
    id: string;
    name: string;
    email: string;
    address: string;
    rating: number;
  }
  
  interface StoreTableProps {
    stores: Store[];
  }
  
  const StoreTable = ({ stores }: StoreTableProps) => {
    return (
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Rating</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => (
            <tr key={store.id}>
              <td className="border p-2">{store.name}</td>
              <td className="border p-2">{store.email}</td>
              <td className="border p-2">{store.address}</td>
              <td className="border p-2">{store.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default StoreTable;
  