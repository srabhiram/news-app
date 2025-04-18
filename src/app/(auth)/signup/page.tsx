/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { signupUser } from "@/redux/features/users/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SignupPage() {
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = React.useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { error, loading, success } = useSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, email, password } = formData;
    if (!username || !email || !password) {
      setFormError("All fields are required");
      return;
    }
    // Perform signup logic here
    try {
      dispatch(signupUser({ name: username, email, password }));

      console.log(success);
      setFormError("");
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    } catch (error: any) {
      console.error("Signup error:", error.message);
    } finally {
      console.log(success);
      if (success) {
        // Redirect to home page or perform any other action
        router.push("/");
      }
    }
  };
  return (
    <>
      <div>
        <h1>సైన్ అప్ చేయండి</h1>
        {formError && <p className="text-red-500">{formError}</p>}
        {error && <p className="text-red-500">{error}</p>}
        <form
          className="flex border-2 flex-col items-center justify-center h-fit bg-slate-100 m-2 p-5 rounded-lg shadow-md w-96"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="యూజర్ పేరు"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mb-4 p-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            placeholder="ఇమెయిల్"
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
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Loading..." : "సైన్ అప్"}
          </button>
        </form>
      </div>
    </>
  );
}
