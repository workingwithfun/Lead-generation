import { useForm } from "react-hook-form";
import API from "../api/axios";
import {
  useNavigate,
  Link,
} from "react-router-dom";
import { useState } from "react";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  role: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [serverError, setServerError] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const onSubmit = async (
    data: RegisterFormData
  ) => {
    try {
      setLoading(true);
      setServerError("");

      await API.post(
        "/auth/register",
        data
      );

      setSuccessMessage(
        "Registration successful! Redirecting..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error: any) {
      setServerError(
        error?.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-100 via-white to-blue-100 flex items-center justify-center px-4 py-6">
      {/* Background */}

      <div className="absolute top-10 left-10 w-56 h-56 bg-blue-200 rounded-full blur-3xl opacity-30" />

      <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-30" />

      <div className="absolute top-20 right-24 w-16 h-16 border-4 border-blue-300 rotate-45 rounded-xl opacity-40" />

      <div className="absolute bottom-20 left-20 w-14 h-14 bg-pink-300 rounded-xl rotate-12 opacity-30" />

      {/* Card */}

      <div className="relative z-10 w-full max-w-sm">
        <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl rounded-3xl p-5">
          {/* Header */}

          <div className="text-center mb-5">
            <h1 className="text-2xl font-bold text-gray-800">
              Create Account
            </h1>

            <p className="text-gray-500 text-sm mt-1">
              Register to continue
            </p>
          </div>

          {/* Error */}

          {serverError && (
            <div className="mb-3 bg-red-100 border border-red-200 text-red-600 px-3 py-2 rounded-xl text-sm">
              {serverError}
            </div>
          )}

          {/* Success */}

          {successMessage && (
            <div className="mb-3 bg-green-100 border border-green-200 text-green-700 px-3 py-2 rounded-xl text-sm">
              {successMessage}
            </div>
          )}

          {/* Form */}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3"
          >
            {/* Name */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>

              <input
                {...register("name", {
                  required:
                    "Name is required",
                  minLength: {
                    value: 3,
                    message:
                      "Minimum 3 characters",
                  },
                })}
                type="text"
                placeholder="Your name"
                className={`w-full p-2.5 rounded-xl border bg-white/70 outline-none transition focus:ring-4 focus:ring-blue-100 ${
                  errors.name
                    ? "border-red-400"
                    : "border-gray-200 focus:border-blue-400"
                }`}
              />

              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>

              <input
                {...register("email", {
                  required:
                    "Email is required",
                  pattern: {
                    value:
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message:
                      "Invalid email",
                  },
                })}
                type="email"
                placeholder="Your email"
                className={`w-full p-2.5 rounded-xl border bg-white/70 outline-none transition focus:ring-4 focus:ring-blue-100 ${
                  errors.email
                    ? "border-red-400"
                    : "border-gray-200 focus:border-blue-400"
                }`}
              />

              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>

              <input
                {...register("password", {
                  required:
                    "Password is required",
                  minLength: {
                    value: 6,
                    message:
                      "Minimum 6 characters",
                  },
                })}
                type="password"
                placeholder="Your password"
                className={`w-full p-2.5 rounded-xl border bg-white/70 outline-none transition focus:ring-4 focus:ring-blue-100 ${
                  errors.password
                    ? "border-red-400"
                    : "border-gray-200 focus:border-blue-400"
                }`}
              />

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {
                    errors.password
                      .message
                  }
                </p>
              )}
            </div>

            {/* Role */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>

              <select
                {...register("role", {
                  required:
                    "Select a role",
                })}
                className="w-full p-2.5 rounded-xl border border-gray-200 bg-white/70 outline-none transition focus:ring-4 focus:ring-blue-100 focus:border-blue-400"
              >
                <option value="">
                  Choose role
                </option>

                <option value="sales">
                  Sales User
                </option>

                <option value="admin">
                  Admin
                </option>
              </select>

              {errors.role && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2.5 rounded-xl shadow-lg hover:scale-[1.01] transition-all duration-300 disabled:opacity-50"
            >
              {loading
                ? "Creating..."
                : "Register"}
            </button>
          </form>

          {/* Footer */}

          <div className="mt-4 text-center">
            <p className="text-gray-500 text-sm">
              Already have an account?
            </p>

            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:text-blue-700 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;