/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { loginUser } from "@/redux/features/users/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function LoginPage() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = React.useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { error, loading } = useSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      setFormError("All fields are required");
      return;
    }
    // Perform login logic here
    try {
      dispatch(loginUser({ email, password }));

      setFormError("");
      setFormData({
        email: "",
        password: "",
      });
      if (!loading && !error) {
        // Redirect to home page or perform any other action
        router.push("/");
      }
    } catch (error: any) {
      console.error("Login error:", error.message);
    } 
    
  };
  return (
    <>
      <div className="flex items-center justify-center h-full mt-10  mx-auto">
        <form
          className="flex border-2 flex-col items-center justify-center h-fit bg-white/10  m-2 p-5 rounded-lg shadow-md w-96"
          onSubmit={handleSubmit}
        >
          {formError && <p className="text-red-500">{formError}</p>}
          {error && <p className="text-red-500">{error}</p>}
          <h2 className="text-2xl font-bold mb-4">లాగిన్</h2>
          <input
            type="email"
            placeholder="యూజర్ పేరు"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mb-4 p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="పాస్వర్డ్"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mb-4 p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
            disabled={loading}
          >
           <span className="font-PottiSreeramulu font-semibold"> {loading ? "Loading..." : "లాగిన్"}</span>
          </button>
          <p className="mt-4 font-gidugu font-bold">
            లాగిన్ చేయడానికి మీకు ఖాతా లేదు?{" "}
            <Link href="/signup" className="text-blue-500">
              సైన్ అప్ చేయండి
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
