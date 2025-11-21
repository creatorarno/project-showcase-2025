import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-full bg-background-dark relative flex items-center justify-center overflow-hidden p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 animated-grid bg-grid-pattern opacity-20 pointer-events-none"></div>
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]"></div>
      
      <div className="relative z-10 w-full max-w-2xl">
        {/* Header Card */}
        <div className="glassmorphism rounded-2xl p-8 border border-white/10 shadow-2xl mb-6 flex flex-col md:flex-row items-center gap-8">
          
          {/* Avatar Section */}
          <div className="relative group">
            <div className="w-24 h-24 rounded-full p-[2px] bg-gradient-to-tr from-primary to-secondary">
              <div className="w-full h-full rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                 <span className="material-symbols-outlined text-4xl text-white/80">person</span>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 bg-primary w-8 h-8 rounded-full flex items-center justify-center text-background-dark cursor-pointer hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-sm font-bold">edit</span>
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-white mb-2">
              {user?.user_metadata?.full_name || 'Anatomy Scholar'}
            </h1>
            <p className="text-text-muted flex items-center justify-center md:justify-start gap-2">
              <span className="material-symbols-outlined text-lg">mail</span>
              {user?.email}
            </p>
            <div className="flex gap-3 mt-4 justify-center md:justify-start">
               <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                 Student Plan
               </span>
               <span className="px-3 py-1 rounded-full bg-white/5 text-text-muted text-xs font-bold border border-white/10">
                 Member since {new Date(user?.created_at).toLocaleDateString()}
               </span>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Account Settings */}
          <div className="glassmorphism rounded-2xl p-6 border border-white/10">
             <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
               <span className="material-symbols-outlined text-primary">settings</span> 
               Account Settings
             </h3>
             <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm text-gray-300 flex justify-between items-center group">
                   Change Password
                   <span className="material-symbols-outlined text-gray-500 group-hover:text-white transition-colors">chevron_right</span>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm text-gray-300 flex justify-between items-center group">
                   Notification Preferences
                   <span className="material-symbols-outlined text-gray-500 group-hover:text-white transition-colors">chevron_right</span>
                </button>
             </div>
          </div>

          {/* Statistics / Danger Zone */}
          <div className="glassmorphism rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
             <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">analytics</span> 
                  Learning Stats
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                   <div className="bg-black/20 p-3 rounded-lg text-center">
                      <p className="text-2xl font-bold text-white">12</p>
                      <p className="text-xs text-gray-400">Hours Studied</p>
                   </div>
                   <div className="bg-black/20 p-3 rounded-lg text-center">
                      <p className="text-2xl font-bold text-primary">85%</p>
                      <p className="text-xs text-gray-400">Avg. Score</p>
                   </div>
                </div>
             </div>
             
             <button 
                onClick={handleLogout}
                className="w-full py-3 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2 font-medium"
             >
                <span className="material-symbols-outlined">logout</span>
                Sign Out
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;