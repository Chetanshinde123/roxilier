// src/components/UserTable.tsx
interface User {
    id: string;
    name: string;
    email: string;
    address: string;
    role: string;
    rating?: number;
  }
  
  interface UserTableProps {
    users: User[];
  }
  
  const UserTable = ({ users }: UserTableProps) => {
    return (
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Rating (if Owner)</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.address}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">{user.role === "owner" ? user.rating ?? "N/A" : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default UserTable;
  