import { useContext, useState } from "react";
import { Eye, EyeOff, LockKeyholeOpen, Mail, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { AuthContext } from "../../context/auth/AuthContext";
import { toast } from "sonner";

const LoginForm = () => {
  const {setUser} = useContext(AuthContext)
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (serverError) {
      setServerError("");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError("");

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/users/login", {
        email: formData.email,
        password: formData.password,
      });

      if (res.data?.success) {
        setUser(res.data?.data.user)
        if(res.data?.data?.user.role === 'admin'){
          navigate("/admin");
        } else{
          navigate("/")
        }
        toast.success("Login Successfull")
      }
    } catch (error) {
      console.log("Login Error:", error);
      setServerError(
        error.response?.data?.message ||
          "Unable to sign in. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto flex flex-col justify-center gap-2 flex-1">
      <h1 className="font-title text-2xl md:text-3xl font-semibold text-text-primary tracking-tight mt-1 mb-1">
        Welcome back 
      </h1>

      <p className="text-sm text-text-secondary mb-6">
        Sign in to continue shopping, manage your orders, and save your favourite products.
      </p>

      {/* Server Error */}
      {serverError && (
        <div className="mb-4 p-3 rounded-lg bg-error/10 border border-error/20 text-error text-xs font-medium">
          {serverError}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-xs font-semibold text-text-primary"
          >
            Email address
          </label>

          <div className="relative flex items-center">
            <Mail
              size={20}
              className="absolute left-3 text-text-secondary pointer-events-none"
            />

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full h-11 pl-10 pr-4 bg-surface-container-low text-text-primary rounded-lg text-sm transition-all focus:outline-none focus:bg-surface focus:ring-2 focus:ring-primary/30 ${
                errors.email ? "ring-2 ring-error/40" : ""
              }`}
            />
          </div>

          {errors.email && (
            <p className="text-xs text-error">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-xs font-semibold text-text-primary"
            >
              Password
            </label>

            <Link
              to="/forgot-password"
              className="text-xs text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative flex items-center">
            <LockKeyholeOpen
              size={19}
              className="absolute left-3 text-text-secondary pointer-events-none"
            />

            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`w-full h-11 pl-10 pr-11 bg-surface-container-low text-text-primary rounded-lg text-sm transition-all focus:outline-none focus:bg-surface focus:ring-2 focus:ring-primary/30 ${
                errors.password ? "ring-2 ring-error/40" : ""
              }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 text-text-secondary hover:text-primary transition-colors"
            >
              {showPassword ? (
                <EyeOff size={19} />
              ) : (
                <Eye size={19} />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="text-xs text-error">{errors.password}</p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="w-4 h-4 accent-primary cursor-pointer"
            />

            <span className="text-xs text-text-secondary">
              Remember me for 30 days
            </span>
          </label>

          <div className="flex items-center gap-1 text-text-secondary">
            <ShieldCheck size={14} />
            <span className="text-[11px]">Session encrypted</span>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 mt-2 bg-primary text-white hover:bg-primary-container active:scale-[0.99] rounded-lg shadow-md transition-all flex items-center justify-center gap-2 text-sm font-semibold disabled:opacity-80 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              <LockKeyholeOpen size={18} />
              Sign In to Atelier
            </>
          )}
        </button>
      </form>

      {/* Register */}
      <div className="mt-6 text-center">
        <span className="text-sm text-text-secondary">
          New to Cartora?{" "}
        </span>

        <Link
          to="/signup"
          className="text-xs font-semibold text-primary hover:underline"
        >
          Create an account
        </Link>
      </div>

      {/* Security Footer */}
      <div className="mt-6 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-text-secondary">
          <ShieldCheck size={15} className="text-success" />
          <span className="text-[11px]">256-Bit SSL Encryption</span>
        </div>

        <div className="flex items-center gap-1.5 text-text-secondary">
          <LockKeyholeOpen size={14} className="text-primary" />
          <span className="text-[11px]">Private & Secure</span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;