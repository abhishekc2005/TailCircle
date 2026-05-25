import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function VerifyOTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  // Mock phone number passed from login, or hardcoded for preview
  const phone = localStorage.getItem("temp_login_phone") || "+91 9819176865";

  const handleChange = (index, value) => {
    // Allow only numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Focus previous input on backspace if current is empty
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Phone verified successfully!");
      navigate("/auth/onboarding");
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
      {/* Header */}
      <div className="flex items-center mb-12 mt-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition">
          <ArrowLeft size={24} className="text-gray-900 dark:text-white" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col max-w-md mx-auto w-full">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm">
            <span className="text-4xl">🐾</span> {/* Placeholder for TailCircle logo */}
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Verify OTP</h1>
          <p className="text-gray-500 text-sm">
            We sent a 6-digit code to {phone}
          </p>
        </div>

        <form onSubmit={handleVerify} className="flex flex-col gap-6">
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-bold rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 outline-none transition"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-[20px] bg-[#e65c55] text-white font-bold text-lg shadow-md hover:bg-[#d64e47] transition flex justify-center items-center"
          >
            {loading ? "Verifying..." : "Verify & Continue"}
          </button>
        </form>

        <div className="text-center mt-6">
          <span className="text-gray-500 text-sm">Didn't receive? </span>
          <button className="text-[#45b09e] font-bold text-sm hover:underline">
            Resend OTP
          </button>
        </div>

        {/* Footer Terms */}
        <div className="mt-auto pb-6 text-center text-xs text-gray-400">
          By continuing, you agree to our Terms of Service and<br />Privacy Policy
        </div>
      </div>
    </div>
  );
}
