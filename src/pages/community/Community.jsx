import { useState, useRef, useEffect } from "react";
import { Header } from "../../components/common/Header";
import { Card } from "../../components/common/Card";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Search, Image as ImageIcon, Video, FileText, X, AlertTriangle, Trash2 } from "lucide-react";
import { cn } from "../../utils/cn";
import { AnimatePresence, motion } from "framer-motion";

const INITIAL_POSTS = [
  {
    id: 1,
    type: "Experience",
    user: { name: "Sarah & Max", avatar: "https://i.pravatar.cc/150?img=5" },
    time: "2 hours ago",
    content: "Max had his first swimming lesson today! He was a bit hesitant at first but ended up loving it! 🐕💦 #GoldenRetriever #SwimmingDog",
    image: "https://images.unsplash.com/photo-1537151608804-ea6f1cb3950b?auto=format&fit=crop&q=80&w=800",
    likes: 124,
    comments: 18,
    isLiked: false,
    isSaved: false,
    category: "Training"
  },
  {
    id: 2,
    type: "Recommendation",
    user: { name: "Alex & Luna", avatar: "https://i.pravatar.cc/150?img=11" },
    time: "5 hours ago",
    content: "Does anyone know a good pet-friendly cafe in downtown? Luna loves watching people pass by while I work. ☕️🐱",
    likes: 45,
    comments: 32,
    isLiked: true,
    isSaved: false,
    category: "Travel"
  },
  {
    id: 3,
    type: "Review",
    user: { name: "Mike & Charlie", avatar: "https://i.pravatar.cc/150?img=12" },
    time: "1 day ago",
    content: "Just tried the new Premium Salmon food from the Shop. Charlie devoured it in seconds! Highly recommend for picky eaters. 🦴🐾",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800",
    likes: 356,
    comments: 42,
    isLiked: false,
    isSaved: true,
    category: "Food"
  }
];

const CATEGORIES = ["All", "Health", "Training", "Food", "Travel", "Lost Pets", "Emergency"];
const POST_TYPES = ["Experience", "Review", "Recommendation"];

function PostCard({ post, onDelete }) {
  const [liked, setLiked] = useState(post.isLiked);
  const [saved, setSaved] = useState(post.isSaved);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <Card className="overflow-hidden mb-6">
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between relative">
        <div className="flex items-center space-x-3">
          <img src={post.user.avatar} alt={post.user.name} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm flex items-center gap-2">
              {post.user.name}
              <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-md font-bold">{post.type}</span>
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">{post.time} • {post.category}</p>
          </div>
        </div>
        
        <div className="relative" ref={menuRef}>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            <MoreHorizontal size={20} />
          </button>
          
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-xl z-10 overflow-hidden"
              >
                <button 
                  onClick={() => { alert("Post reported for moderation review."); setIsMenuOpen(false); }}
                  className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition"
                >
                  <AlertTriangle size={16} /> Report Post
                </button>
                <button 
                  onClick={() => { onDelete(post.id); setIsMenuOpen(false); }}
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2 transition"
                >
                  <Trash2 size={16} /> Remove Post
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-sm text-gray-800 dark:text-gray-200">{post.content}</p>
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="w-full max-h-[500px] bg-gray-100 dark:bg-gray-800">
          <img src={post.image} alt="Post media" className="w-full h-full object-cover" loading="lazy" />
        </div>
      )}

      {/* Post Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-4">
            <button onClick={handleLike} className="flex items-center space-x-1.5 group">
              <Heart size={24} className={cn("transition-colors", liked ? "fill-red-500 text-red-500" : "text-gray-500 group-hover:text-red-500")} />
            </button>
            <button className="flex items-center space-x-1.5 group">
              <MessageCircle size={24} className="text-gray-500 group-hover:text-primary transition-colors" />
            </button>
            <button className="flex items-center space-x-1.5 group">
              <Share2 size={24} className="text-gray-500 group-hover:text-primary transition-colors" />
            </button>
          </div>
          <button onClick={() => setSaved(!saved)}>
            <Bookmark size={24} className={cn("transition-colors", saved ? "fill-primary text-primary" : "text-gray-500 hover:text-primary")} />
          </button>
        </div>
        
        {/* Likes & Comments Count */}
        <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
          {likesCount} likes
        </div>
        <button className="text-sm text-gray-500 dark:text-gray-400">
          View all {post.comments} comments
        </button>
      </div>
    </Card>
  );
}

export default function Community() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // Create Post State
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostType, setNewPostType] = useState("Experience");
  const [newPostCategory, setNewPostCategory] = useState("Training");

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) || post.user.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDeletePost = (id) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost = {
      id: Date.now(),
      type: newPostType,
      user: { name: "You & Your Pet", avatar: "https://i.pravatar.cc/150?img=32" },
      time: "Just now",
      content: newPostContent,
      likes: 0,
      comments: 0,
      isLiked: false,
      isSaved: false,
      category: newPostCategory
    };

    setPosts(prev => [newPost, ...prev]);
    setIsCreateModalOpen(false);
    setNewPostContent("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 lg:pb-0 relative">
      <Header title="Community" />
      
      <div className="flex-1 max-w-2xl mx-auto w-full p-4 lg:p-6 lg:pt-8">
        
        {/* 4.7 Search Bar */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search discussions, reviews, tags..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-900 dark:text-white shadow-sm"
          />
        </div>

        {/* 4.5 Category Filters */}
        <div className="flex overflow-x-auto hide-scrollbar space-x-2 mb-6 pb-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-all shadow-sm",
                activeCategory === cat 
                  ? "bg-[#32736b] text-white" 
                  : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Create Post Input Trigger (Prototype Design) */}
        <Card className="mb-8 p-4 shadow-sm border border-gray-100 dark:border-gray-800 rounded-3xl" onClick={() => setIsCreateModalOpen(true)}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#32736b] flex items-center justify-center text-white font-black text-sm shrink-0">
              YO
            </div>
            <div className="flex-1 text-left text-gray-400 dark:text-gray-500 text-sm font-medium cursor-text">
              Share something with the pack...
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300 text-sm font-bold">
              <ImageIcon size={16} className="text-gray-400" />
              <span>Photo</span>
            </button>
            <button className="px-6 py-2 bg-[#f1eeec] dark:bg-gray-800 text-gray-400 font-bold rounded-full text-sm">
              Post
            </button>
          </div>
        </Card>

        {/* Feed */}
        <div className="space-y-6">
          <AnimatePresence>
            {filteredPosts.map(post => (
              <motion.div key={post.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}>
                <PostCard post={post} onDelete={handleDeletePost} />
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredPosts.length === 0 && (
            <div className="text-center py-10 text-gray-500 dark:text-gray-400">
              No posts found for "{searchQuery}" in {activeCategory}.
            </div>
          )}
        </div>
      </div>

      {/* Robust Post Creation Modal (4.2 & 4.3) */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCreateModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Create Post</h2>
                <button onClick={() => setIsCreateModalOpen(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-500">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreatePost} className="p-4 flex flex-col gap-4">
                <div className="flex gap-4">
                  <img src="https://i.pravatar.cc/150?img=32" alt="You" className="w-10 h-10 rounded-full" />
                  <div className="flex-1 flex flex-col gap-2">
                    <select 
                      value={newPostType} onChange={e => setNewPostType(e.target.value)}
                      className="bg-gray-100 dark:bg-gray-800 border-none rounded-lg text-sm font-bold text-primary px-3 py-1.5 focus:ring-0 w-fit cursor-pointer"
                    >
                      {POST_TYPES.map(t => <option key={t} value={t}>{t} Post</option>)}
                    </select>
                    
                    <textarea 
                      placeholder="What do you want to share with the community?"
                      value={newPostContent} onChange={e => setNewPostContent(e.target.value)}
                      className="w-full bg-transparent border-none resize-none min-h-[100px] text-gray-900 dark:text-white placeholder-gray-400 focus:ring-0 p-0 text-base"
                      autoFocus
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <select 
                    value={newPostCategory} onChange={e => setNewPostCategory(e.target.value)}
                    className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 px-2 py-1 focus:ring-0 cursor-pointer"
                  >
                    {CATEGORIES.filter(c => c !== "All").map(c => <option key={c} value={c}>Category: {c}</option>)}
                  </select>

                  <div className="flex gap-2">
                    <button type="button" className="p-2 text-primary hover:bg-primary/10 rounded-full transition"><ImageIcon size={20} /></button>
                    <button type="button" className="p-2 text-primary hover:bg-primary/10 rounded-full transition"><Video size={20} /></button>
                    <button type="button" className="p-2 text-primary hover:bg-primary/10 rounded-full transition"><FileText size={20} /></button>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={!newPostContent.trim()}
                  className="w-full mt-2 bg-primary text-white font-bold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-dark transition-colors"
                >
                  Post to Community
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
