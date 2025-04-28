// src/pages/Register.tsx
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from "../utils/validationSchema.ts";
import { useNavigate } from "react-router-dom";
import api from "../services/api.ts";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      role: "user"
    }
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await axios.post('http://localhost:5000/api/signup', {
        name: data.name,
        email: data.email,
        address: data.address,
        password: data.password,
        role: data.role
      }, { withCredentials: true });

      console.log("Registration success:", res.data);
      navigate("/"); // Or navigate("/login")
    } catch (err) {
      console.error("Registration error:", err);
      setError("Registration failed. Email may already be in use.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input {...register("name")} placeholder="Name" className="border p-2 w-full" />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <input {...register("email")} placeholder="Email" className="border p-2 w-full" />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <input {...register("address")} placeholder="Address" className="border p-2 w-full" />
          {errors.address && <p className="text-red-500">{errors.address.message}</p>}
        </div>
        <div className="mb-4">
          <input {...register("password")} placeholder="Password" type="password" className="border p-2 w-full" />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Select Role</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" value="user" {...register("role")} />
              User
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" value="owner" {...register("role")} />
              Owner
            </label>
          </div>
          {errors.role && <p className="text-red-500">{errors.role.message}</p>}
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;
