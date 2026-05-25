import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { Mail, Lock, User, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", city: "" });
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 1 && (!formData.name || !formData.email)) {
      toast.error("Please fill required fields");
      return;
    }
    setStep(2);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!formData.password || !formData.city) {
      toast.error("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      await signup(formData);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full relative">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Create Account</h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Join the Petverse community today</p>
      </div>

      <div className="flex items-center space-x-2 mb-8">
        <div className={`h-2 flex-1 rounded-full transition-colors ${step >= 1 ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-800'}`} />
        <div className={`h-2 flex-1 rounded-full transition-colors ${step >= 2 ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-800'}`} />
      </div>

      <div className="relative overflow-hidden min-h-[300px]">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.form
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-5"
            >
              <Input
                placeholder="Full Name"
                icon={User}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <Input
                type="email"
                placeholder="Email address"
                icon={Mail}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <Button type="button" className="w-full mt-4" onClick={handleNext}>
                Continue
              </Button>
            </motion.form>
          ) : (
            <motion.form
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-5"
              onSubmit={handleSignup}
            >
              <Input
                type="password"
                placeholder="Password"
                icon={Lock}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <Input
                placeholder="City / State"
                icon={MapPin}
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
              <div className="flex space-x-3 mt-4">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button type="submit" className="flex-[2]" isLoading={loading}>
                  Complete
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8 text-center text-sm">
        <span className="text-gray-500 dark:text-gray-400">Already have an account? </span>
        <Link to="/auth/login" className="text-primary font-semibold hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
