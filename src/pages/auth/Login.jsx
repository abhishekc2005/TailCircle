import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Login() {
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!mobile || mobile.length < 10) return;
    
    setLoading(true);
    // Simulate sending OTP
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("temp_login_phone", `+91 ${mobile}`);
      navigate("/auth/verify-otp");
    }, 800);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 p-6 md:p-0">
      {/* Header (visible on mobile layout) */}
      <div className="flex items-center mb-8 mt-4 md:hidden">
        <button className="p-2 -ml-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition">
          <ArrowLeft size={24} className="text-gray-900 dark:text-white" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full md:py-12">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm p-4">
             {/* Note: In a real app we'd use the actual logo image. For now, a placeholder that looks good */}
            <span className="text-5xl">🐾</span>
          </div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Welcome Back!</h1>
          <p className="text-gray-500 text-sm">
            Enter your mobile number to continue
          </p>
        </div>

        <form onSubmit={handleSendOTP} className="flex flex-col gap-6">
          {/* Mobile Input */}
          <div className="flex items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm h-14">
            <div className="flex items-center px-4 border-r border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
              <span className="text-lg mr-2">🇮🇳</span>
              <span className="font-bold text-gray-800 dark:text-gray-200">+91</span>
            </div>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter mobile number"
              className="flex-1 px-4 bg-transparent outline-none text-gray-900 dark:text-white font-medium placeholder-gray-400"
              maxLength={10}
            />
          </div>

          <button
            type="submit"
            disabled={!mobile || mobile.length < 10 || loading}
            className="w-full py-4 rounded-[20px] bg-[#e65c55] text-white font-bold text-lg shadow-md hover:bg-[#d64e47] disabled:opacity-50 disabled:cursor-not-allowed transition flex justify-center items-center"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>

        {/* Footer Terms */}
        <div className="mt-20 md:mt-32 text-center text-xs text-gray-400">
          By continuing, you agree to our Terms of Service and<br />Privacy Policy
        </div>
      </div>
    </div>
  );
}
