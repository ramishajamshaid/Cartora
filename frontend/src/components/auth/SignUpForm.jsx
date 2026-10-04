import { useState } from "react";
import { Eye, EyeOff, LockKeyholeOpen } from "lucide-react";
import api from "../../api/api";
import {useNavigate} from 'react-router-dom'

const SignUpForm = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Remove error when user starts correcting the field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters.";
    }

    // Username
    if (!formData.username.trim()) {
      newErrors.username = "Username is required.";
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters.";
    } else if (formData.username.trim().length > 20) {
      newErrors.username = "Username must not exceed 20 characters.";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username.trim())) {
      newErrors.username =
        "Username can only contain letters, numbers, and underscores.";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one lowercase letter.";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one number.";
    }

    // Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    // Terms
    if (!formData.terms) {
      newErrors.terms = "You must agree to the Terms of Service.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setIsLoading(true)

    try {
      const res = await api.post('/users/register', formData)
      if (res.data?.success) {
        console.log(res);
      }
    } catch (error) {
      console.log("Error: ", error);
    } finally{
      setIsLoading(false)
      navigate('/login')
    }

  };

  return (
    <div className="max-w-xl mx-auto w-full">

      {/* Form Heading */}
      <div className="space-y-1 mb-6">
        <div className="flex items-center gap-1 text-primary">
          <LockKeyholeOpen size={18} />

          <span className="text-xs font-semibold uppercase tracking-wide">
            Create Account
          </span>
        </div>

        <h1 className="text-3xl font-semibold text-text-primary">
          Create your Account
        </h1>

        <p className="text-sm text-text-secondary">
          Begin your journey with our marketplace.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Full Name
          </label>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={`w-full h-11 px-4 rounded-lg border bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.fullName ? "border-error" : "border-border"
              }`}
          />

          {errors.fullName && (
            <p className="mt-1 text-xs text-error">
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Username
          </label>

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Choose a username"
            maxLength={20}
            className={`w-full h-11 px-4 rounded-lg border bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.username ? "border-error" : "border-border"
              }`}
          />

          {errors.username && (
            <p className="mt-1 text-xs text-error">
              {errors.username}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`w-full h-11 px-4 rounded-lg border bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.email ? "border-error" : "border-border"
              }`}
          />

          {errors.email && (
            <p className="mt-1 text-xs text-error">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              className={`w-full h-11 px-4 pr-12 rounded-lg border bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.password ? "border-error" : "border-border"
                }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1 text-xs text-error">
              {errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Confirm Password
          </label>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className={`w-full h-11 px-4 pr-12 rounded-lg border bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.confirmPassword
                ? "border-error"
                : "border-border"
                }`}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary"
            >
              {showConfirmPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-error">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Terms */}
        <div>
          <label className="flex items-start gap-2 text-sm text-text-secondary">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              className="mt-1 accent-primary"
            />

            <span>
              I agree to the{" "}
              <a href="#" className="text-primary underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary underline">
                Privacy Policy
              </a>
            </span>
          </label>

          {errors.terms && (
            <p className="mt-1 text-xs text-error">
              {errors.terms}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className={`w-full mx-auto flex justify-center items-center h-12 rounded-lg ${isLoading?"opacity-80":"opacity-100 hover:bg-primary-container"} bg-primary text-white font-medium transition`}
          disabled={isLoading}
        >
          {isLoading?
            (<div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />):
            "Create Account"
          }
          
        </button>

      </form>
    </div>
  );
};

export default SignUpForm;