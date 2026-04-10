// pages/VerifyEmail.jsx
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("loading"); 
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No verification token found in the URL.");
      return;
    }

    const verify = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/auth/verify-email?token=${token}`
        );
        setStatus("success");
        setMessage(res.data.message);
      } catch (err) {
        setStatus("error");
        setMessage(err.response?.data?.message || "Verification failed.");
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center">
      <div className="w-full max-w-md px-6 py-8 bg-navy-card border-navy-border rounded-lg text-center">

        {status === "loading" && (
          <>
            <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-text-muted">Verifying your email...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-green-400 text-5xl mb-4">✓</div>
            <h1 className="text-text-base text-xl font-semibold mb-2">Email Verified!</h1>
            <p className="text-text-muted mb-6">{message}</p>
            <button
              onClick={() => navigate("/login")}
              className="bg-gold hover:bg-gold/90 text-black px-6 py-2 rounded"
            >
              Go to Login
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-red-400 text-5xl mb-4">✕</div>
            <h1 className="text-text-base text-xl font-semibold mb-2">Verification Failed</h1>
            <p className="text-text-muted mb-6">{message}</p>
            <button
              onClick={() => navigate("/")}
              className="bg-gold hover:bg-gold/90 text-black px-6 py-2 rounded"
            >
              Back to Register
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default VerifyEmail;