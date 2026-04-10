import { useState } from "react";
import axios from "axios";
import { AuthContext } from "../AppContext";

const BASE = "http://localhost:5000/api";

const AuthState = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState();

  // ── Register ──────────────────────────────────────────
  const registerAdmin = async (name, email, password) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${BASE}/auth/admin/registration`,
        { name, email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      return { success: true, message: data.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    } finally {
      setLoading(false);
    }
  };

  // ── Login ─────────────────────────────────────────────
  const loginAdmin = async (email, password) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${BASE}/auth/login`,
        { email, password },
        { withCredentials: true },
      );
      localStorage.setItem("token", data.token);
      setAdmin({ role: data.role, token: data.token });
      setToken(data.token);
      return { success: true, message: data.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    } finally {
      setLoading(false);
    }
  };

  // ── Logout ────────────────────────────────────────────
  const logoutAdmin = () => {
    localStorage.removeItem("token");
    setAdmin(null);
  };

  // ── Forgot Password ───────────────────────────────────
  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${BASE}/auth/forgot/password`, {
        email,
      });
      return { success: true, message: data.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    } finally {
      setLoading(false);
    }
  };

  // ── Reset Password ────────────────────────────────────
  const resetPassword = async (token, newPassword, confirmPassword) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${BASE}/auth/password/reset?token=${token}`,
        { newPassword, confirmPassword },
      );
      return { success: true, message: data.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    } finally {
      setLoading(false);
    }
  };

  // ── Get Profile ───────────────────────────────────────
  const getProfile = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE}/user/profile`, {
        headers: {
          Auth: localStorage.getItem("token"),
        },
        withCredentials: true,
      });
      setAdmin(data.user);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    } finally {
      setLoading(false);
    }
  };

  // ── Update Profile ────────────────────────────────────
  const updateProfile = async (updates) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`${BASE}/user/profile`, updates, {
        headers: {
          Auth: localStorage.getItem("token"),
        },
        withCredentials: true,
      });
      setAdmin(data.user);
      return { success: true, message: data.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        loading,
        error,
        registerAdmin,
        loginAdmin,
        logoutAdmin,
        forgotPassword,
        resetPassword,
        getProfile,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
