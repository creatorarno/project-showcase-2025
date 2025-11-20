import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const linkClass = (path: string) => 
    `text-sm font-medium transition-colors ${isActive(path) ? 'text-primary' : 'text-text-muted hover:text-white'}`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background-dark/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-3xl">neurology</span>
          <span className="text-xl font-bold tracking-tight text-white">VR Anatomy AI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/dashboard" className={linkClass('/dashboard')}>VR Lab</Link>
          <Link to="/community" className={linkClass('/community')}>Community Hub</Link>
          <Link to="/tutor" className={linkClass('/tutor')}>AI Tutor</Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-lg">search</span>
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-card-dark/50 border border-white/10 rounded-full py-1.5 pl-10 pr-4 text-sm focus:ring-primary focus:border-primary"
            />
          </div>
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px]">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" alt="User" className="rounded-full h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
};