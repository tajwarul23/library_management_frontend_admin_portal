import { useNavigate } from "react-router-dom";

const VerifyNotice = () => {
  

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center">
      <div className="w-full max-w-md px-6 py-8 bg-navy-card border-navy-border rounded-lg text-center">

        <div className="text-gold text-5xl mb-4">📧</div>

        <h1 className="text-text-base text-xl font-semibold mb-2">
          Verify Your Email
        </h1>

        <p className="text-text-muted mb-6">
          We’ve sent a verification link to the SEC Authority.  
          Please Wait for the verification.
        </p>

       
      </div>
    </div>
  );
};

export default VerifyNotice;