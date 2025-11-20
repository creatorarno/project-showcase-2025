import React from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 animated-grid bg-grid-pattern opacity-20 z-0 pointer-events-none"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px]"></div>

      <header className="relative z-10 container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-3xl">neurology</span>
          <span className="text-xl font-bold">VR Anatomy AI</span>
        </div>
        <div className="flex gap-4">
          <Link to="/dashboard" className="px-4 py-2 text-sm font-bold text-white hover:text-primary transition-colors">Login</Link>
          <Link to="/dashboard" className="px-5 py-2 rounded-lg bg-primary text-background-dark text-sm font-bold hover:shadow-neon transition-all">
            Request Demo
          </Link>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-6 pt-20 pb-32 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
          Revolutionizing Medical <br />
          Education with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">VR & AI</span>
        </h1>
        <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10">
          An immersive, AI-powered platform for the next generation of anatomical learning. 
          Step into a new dimension of understanding.
        </p>
        
        <div className="flex justify-center gap-4 flex-wrap">
          <Link to="/dashboard" className="px-8 py-4 rounded-xl bg-primary text-background-dark font-bold text-lg hover:scale-105 transition-transform shadow-neon">
            Explore Anatomy VR
          </Link>
          <Link to="/tutor" className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur border border-white/20 font-bold text-lg hover:bg-white/20 transition-colors">
            Try AI Tutor
          </Link>
        </div>

        {/* Feature Grid from your HTML */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24 text-left">
          {[
            { icon: 'cancel', title: 'The Problem', desc: 'Traditional methods are static, costly, and lack hands-on practice.' },
            { icon: 'track_changes', title: 'Our Objective', desc: 'Make anatomy learning immersive, accurate, and accessible.' },
            { icon: 'neurology', title: 'Impact of VR + AI', desc: 'Vivid 3D visualization with AI-guided feedback.' },
            { icon: 'school', title: 'Student Benefits', desc: 'Improve retention and enable safe practice on complex cases.' }
          ].map((feature, idx) => (
            <div key={idx} className="glassmorphism p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
              <span className="material-symbols-outlined text-secondary text-4xl mb-4">{feature.icon}</span>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-text-muted">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Landing;