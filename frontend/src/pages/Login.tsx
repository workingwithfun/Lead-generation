import { useForm } from "react-hook-form";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const { login } = useAuth();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [serverError, setServerError] =
    useState("");

const onSubmit = async (
  data: LoginFormData
) => {
  try {
    setLoading(true);

    setServerError("");

    const res = await API.post(
      "/auth/login",
      data
    );

    login(res.data);

    if (
      res.data.user.role === "admin"
    ) {
      navigate("/admin-dashboard");
    } else {
      navigate("/dashboard");
    }
  } catch (error: any) {
    setServerError(
      error?.response?.data?.message ||
        "Invalid email or password"
    );
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-100 via-white to-sky-100 flex items-center justify-center px-4">
      {/* Background Shapes */}

      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply blur-3xl opacity-40 animate-pulse" />

      <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply blur-3xl opacity-40 animate-pulse" />

      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />

      {/* Geometric Shapes */}

      <div className="absolute top-20 right-32 w-24 h-24 border-4 border-blue-300 rotate-45 rounded-2xl opacity-40" />

      <div className="absolute bottom-24 left-24 w-16 h-16 bg-pink-300 rounded-xl rotate-12 opacity-30" />

      <div className="absolute top-1/3 left-20 w-20 h-20 border-4 border-purple-300 rounded-full opacity-40" />

      {/* Login Card */}

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/60">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">
              Welcome Back
            </h1>

            <p className="text-gray-500 mt-2">
              Login to your account
            </p>
          </div>

          {serverError && (
            <div className="mb-5 bg-red-100 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
              {serverError}
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            {/* Email */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>

              <input
                {...register("email", {
                  required:
                    "Email is required",
                  pattern: {
                    value:
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message:
                      "Enter a valid email",
                  },
                })}
                type="email"
                placeholder="Enter your email"
                className={`w-full p-3 rounded-xl border bg-white/70 outline-none transition-all duration-300 focus:ring-4 focus:ring-blue-100 ${
                  errors.email
                    ? "border-red-400"
                    : "border-gray-200 focus:border-blue-400"
                }`}
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>

              <input
                {...register("password", {
                  required:
                    "Password is required",
                  minLength: {
                    value: 6,
                    message:
                      "Password must be at least 6 characters",
                  },
                })}
                type="password"
                placeholder="Enter your password"
                className={`w-full p-3 rounded-xl border bg-white/70 outline-none transition-all duration-300 focus:ring-4 focus:ring-blue-100 ${
                  errors.password
                    ? "border-red-400"
                    : "border-gray-200 focus:border-blue-400"
                }`}
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {
                    errors.password
                      .message
                  }
                </p>
              )}
            </div>

            {/* Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold p-3 rounded-xl shadow-lg hover:scale-[1.02] hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              {loading
                ? "Signing in..."
                : "Login"}
            </button>
          </form>

          {/* Footer */}

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Don’t have an account?
            </p>

            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:text-blue-700 transition"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;