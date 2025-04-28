// src/pages/Profile.tsx
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import api from "../services/api.ts";

const schema = yup.object().shape({
  password: yup.string()
    .min(8)
    .max(16)
    .matches(/[A-Z]/, 'Must include an uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Must include a special character')
    .required(),
});

const Profile = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: any) => {
    await api.put("/auth/change-password", { password: data.password });
    alert("Password updated successfully!");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Update Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input {...register("password")} placeholder="New Password" type="password" className="border p-2 w-full" />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
};

export default Profile;
