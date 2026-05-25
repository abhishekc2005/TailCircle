import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useVendorAuth } from '../context/VendorAuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function VendorRegistration() {
  const [step, setStep] = useState(1);
  const { register, isLoading } = useVendorAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    businessName: '',
    role: 'shop',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    gst: '',
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 3) {
      handleNext();
      return;
    }
    
    try {
      await register(formData);
      toast.success('Registration submitted!');
      navigate('/vendor/pending');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Vendor Registration</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Join the network in 3 easy steps.</p>
        
        {/* Progress Bar */}
        <div className="mt-4 flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded transition-all duration-300"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          ></div>
          {[1, 2, 3].map((num) => (
            <div 
              key={num} 
              className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors
                ${step >= num ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}
              `}
            >
              {step > num ? <CheckCircle className="w-5 h-5" /> : num}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Business Name</label>
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Service Category</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-800"
                >
                  <option value="shop">Shop Vendor</option>
                  <option value="events">Event Organizer</option>
                  <option value="doctor">Veterinary Doctor</option>
                  <option value="meals">Meal Provider</option>
                  <option value="memorial">Memorial Provider</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Owner Name</label>
                <input
                  type="text"
                  required
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-800"
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                <textarea
                  required
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">GST Number (Optional)</label>
                <input
                  type="text"
                  value={formData.gst}
                  onChange={(e) => setFormData({ ...formData, gst: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-800"
                />
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Upload License/Registration Document</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg hover:border-primary transition-colors cursor-pointer bg-gray-50 dark:bg-gray-800/50">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                      <span className="relative cursor-pointer bg-transparent rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none">
                        <span>Upload a file</span>
                      </span>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PDF, PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Upload ID Proof (Aadhaar/PAN)</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg hover:border-primary transition-colors cursor-pointer bg-gray-50 dark:bg-gray-800/50">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                      <span className="relative cursor-pointer bg-transparent rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none">
                        <span>Upload a file</span>
                      </span>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 flex gap-4">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="w-1/3 flex justify-center py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none transition-colors"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className={`flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-colors ${step > 1 ? 'w-2/3' : 'w-full'}`}
          >
            {isLoading ? 'Processing...' : step === 3 ? 'Submit Application' : 'Continue'}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/vendor/login" className="font-medium text-primary hover:text-primary/80">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
