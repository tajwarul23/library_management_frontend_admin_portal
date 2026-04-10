import { useState } from "react";
import axios from "axios";
import { AuthContext } from "../AppContext";
import { useEffect } from "react";

const BASE = "http://localhost:5000/api";

const AuthState = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isInitializing, setIsInitializing] = useState(true);

  //-------------------USE_EFFECT----------------------------------
useEffect(() => {
  const storedToken = localStorage.getItem("token");
  console.log("1. storedToken on mount:", storedToken);
  if (storedToken) {
    setToken(storedToken);
    getProfile().then((res) => {
      console.log("2. getProfile result:", res);
        setIsInitializing(false);
    })
  } else {
    setIsInitializing(false);
  }
}, []);

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
        `${BASE}/auth/admin/login`,
        { email, password },
        { withCredentials: true },
      );

      localStorage.setItem("token", data.token);
      setAdmin({ role: data.role, token: data.token });
      console.log("LOGIN RESPONSE:", data);
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
    setToken(null); // ← fix 2: also clear token state
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
    const storedToken = localStorage.getItem("token");
    console.log("3. getProfile token:", storedToken);
    const { data } = await axios.get(`${BASE}/user/profile`, {
      headers: { Auth: storedToken },
      withCredentials: true,
    });
    console.log("4. getProfile data:", data);
    setAdmin(data.data);
    return { success: true };
  } catch (err) {
    console.log("5. getProfile error:", err.response?.status, err.response?.data);
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      setToken(null);
      setAdmin(null);
    }
    return { success: false };
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
        isInitializing
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
