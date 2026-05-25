import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const SPECIES = ["Dog", "Cat", "Bird", "Rabbit", "Other"];
const BREEDS = [
  "Golden Retriever", "Labrador", "Beagle", 
  "Pomeranian", "German Shepherd", "Indie", 
  "Husky", "Poodle", "Other"
];

export default function Onboarding() {
  const [formData, setFormData] = useState({
    name: "",
    species: "Dog",
    breed: "Golden Retriever",
    age: "",
    gender: "Male",
    vaccinated: true,
    bio: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // We'll just trigger the auth state login here after onboarding

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.breed) {
      toast.error("Please fill in required fields (*)");
      return;
    }

    setLoading(true);
    // Simulate API call to save pet profile
    setTimeout(async () => {
      // Mock logging the user in to give them access to the main app
      try {
        await login("user@example.com", "password123");
        toast.success("Profile saved successfully!");
        navigate("/");
      } catch (err) {
        toast.error("Error saving profile");
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 p-6 md:py-12">
      <div className="flex-1 flex flex-col max-w-md mx-auto w-full">
        {/* Logo */}
        <div className="flex justify-center mt-4 mb-6">
          <div className="w-16 h-16 bg-[#eaf5f3] rounded-[20px] flex items-center justify-center shadow-sm">
            <span className="text-3xl">🐾</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Meet Your Pet!</h1>
          <p className="text-gray-500 text-sm">
            Tell us about your furry family member to get started
          </p>
        </div>

        <form onSubmit={handleSave} className="flex flex-col gap-6 pb-24">
          
          {/* Pet Name */}
          <div>
            <label className="block text-[15px] font-black text-gray-900 dark:text-white mb-2">
              Pet Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Bruno, Coco, Whiskers"
              className="w-full h-14 px-4 rounded-[16px] border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:border-[#45b09e] transition shadow-sm"
            />
          </div>

          {/* Species */}
          <div>
            <label className="block text-[15px] font-black text-gray-900 dark:text-white mb-3">
              Species
            </label>
            <div className="flex flex-wrap gap-2">
              {SPECIES.map(species => (
                <button
                  key={species}
                  type="button"
                  onClick={() => setFormData({...formData, species})}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold border transition ${
                    formData.species === species 
                    ? "bg-[#45b09e] text-white border-[#45b09e]" 
                    : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800"
                  }`}
                >
                  {species}
                </button>
              ))}
            </div>
          </div>

          {/* Breed */}
          <div>
            <label className="block text-[15px] font-black text-gray-900 dark:text-white mb-3">
              Breed *
            </label>
            <div className="flex flex-wrap gap-2">
              {BREEDS.map(breed => (
                <button
                  key={breed}
                  type="button"
                  onClick={() => setFormData({...formData, breed})}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold border transition ${
                    formData.breed === breed 
                    ? "bg-[#45b09e] text-white border-[#45b09e]" 
                    : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800"
                  }`}
                >
                  {breed}
                </button>
              ))}
            </div>
          </div>

          {/* Age & Gender */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-[15px] font-black text-gray-900 dark:text-white mb-2">
                Age
              </label>
              <input
                type="text"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                placeholder="e.g. 2 years"
                className="w-full h-14 px-4 rounded-[16px] border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:border-[#45b09e] transition shadow-sm"
              />
            </div>
            <div className="flex-1">
              <label className="block text-[15px] font-black text-gray-900 dark:text-white mb-2">
                Gender
              </label>
              <div className="flex h-14 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[16px] overflow-hidden shadow-sm p-1">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, gender: "Male"})}
                  className={`flex-1 flex items-center justify-center gap-1 rounded-[12px] text-sm font-bold transition ${
                    formData.gender === "Male" ? "bg-[#45b09e] text-white" : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  <span>♂</span> Male
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, gender: "Female"})}
                  className={`flex-1 flex items-center justify-center gap-1 rounded-[12px] text-sm font-bold transition ${
                    formData.gender === "Female" ? "bg-[#45b09e] text-white" : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  <span>♀</span> Female
                </button>
              </div>
            </div>
          </div>

          {/* Vaccinated Toggle */}
          <div className="flex items-center justify-between mt-2">
            <div>
              <label className="block text-[15px] font-black text-gray-900 dark:text-white">
                Vaccinated?
              </label>
              <p className="text-gray-400 text-sm">All vaccines up to date</p>
            </div>
            <button
              type="button"
              onClick={() => setFormData({...formData, vaccinated: !formData.vaccinated})}
              className={`w-14 h-8 rounded-full flex items-center p-1 transition-colors ${
                formData.vaccinated ? "bg-[#45b09e]" : "bg-gray-300 dark:bg-gray-700"
              }`}
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow-sm transform transition-transform ${
                formData.vaccinated ? "translate-x-6" : "translate-x-0"
              }`} />
            </button>
          </div>

          {/* Short Bio */}
          <div>
            <label className="block text-[15px] font-black text-gray-900 dark:text-white mb-2">
              Short Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              placeholder="Tell other pet parents about your pet's personality..."
              className="w-full p-4 rounded-[16px] border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:border-[#45b09e] transition shadow-sm h-32 resize-none"
            />
          </div>
          
          {/* Submit Button - Fixed at bottom on mobile */}
          <div className="fixed bottom-0 left-0 right-0 p-6 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900 md:static md:bg-transparent md:border-t-0 md:p-0 z-10">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-[20px] bg-[#e65c55] text-white font-bold text-lg shadow-md hover:bg-[#d64e47] disabled:opacity-50 transition flex justify-center items-center"
            >
              {loading ? "Saving..." : <span className="flex items-center gap-2"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg> Save & Continue</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
