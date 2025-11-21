import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabase';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  // 1. Check User Status on Mount
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Handle Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    // Redirect to login page after signing out
    navigate('/login'); 
  };

  const isActive = (path: string) => location.pathname === path;
  const linkClass = (path: string) => 
    `text-sm font-medium transition-colors ${isActive(path) ? 'text-primary' : 'text-text-muted hover:text-white'}`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background-dark/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-3xl">neurology</span>
          <span className="text-xl font-bold tracking-tight text-white">VR Anatomy AI</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/dashboard" className={linkClass('/dashboard')}>VR Lab</Link>
          <Link to="/community" className={linkClass('/community')}>Community Hub</Link>
          <Link to="/tutor" className={linkClass('/tutor')}>AI Tutor</Link>
        </nav>

        {/* Right Side: Search + Auth Profile */}
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-lg">search</span>
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-card-dark/50 border border-white/10 rounded-full py-1.5 pl-10 pr-4 text-sm text-white focus:ring-primary focus:border-primary focus:outline-none"
            />
          </div>

          {user ? (
            /* LOGGED IN VIEW */
            <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px]">
                  <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="User" className="rounded-full h-full w-full object-cover bg-black" />
                </div>
                <button 
                  onClick={handleLogout}
                  className="text-xs font-bold text-red-400 hover:text-red-300 border border-red-500/30 bg-red-500/10 px-3 py-1.5 rounded-lg transition-colors"
                >
                  Log Out
                </button>
            </div>
          ) : (
            /* LOGGED OUT VIEW */
            <Link to="/login" className="px-4 py-2 rounded-lg bg-primary text-background-dark text-sm font-bold hover:opacity-90 transition-opacity">
              Log In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};