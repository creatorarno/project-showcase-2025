import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';

const Dashboard: React.FC = () => {
  const [activeSystem, setActiveSystem] = useState('Muscular');

  return (
    <div className="flex flex-col h-screen bg-background-dark">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar: Systems */}
        <aside className="w-64 border-r border-white/10 p-4 flex flex-col gap-6 bg-card-dark/50">
          <div>
            <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">Systems</h2>
            <div className="space-y-2">
              {['Skeletal', 'Muscular', 'Nervous', 'Circulatory', 'Digestive'].map((sys) => (
                <button 
                  key={sys}
                  onClick={() => setActiveSystem(sys)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeSystem === sys 
                    ? 'bg-primary/20 text-primary border border-primary/20' 
                    : 'text-text-muted hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">
                    {sys === 'Skeletal' ? 'skeleton' : sys === 'Muscular' ? 'accessibility_new' : sys === 'Nervous' ? 'neurology' : 'cardiology'}
                  </span>
                  {sys}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Center: 3D Viewer Area */}
        <main className="flex-1 relative bg-[radial-gradient(circle_at_center,_rgba(0,212,255,0.1)_0%,_rgba(10,11,30,1)_70%)] flex items-center justify-center">
          {/* Placeholder for 3D Model */}
          <div className="relative group cursor-pointer">
             {/* Using a specific anatomy image placeholder */}
            <img 
              src="https://cdn.pixabay.com/photo/2012/04/13/13/18/skeleton-32378_1280.png" 
              alt="3D Model" 
              className="max-h-[75vh] w-auto opacity-90 drop-shadow-[0_0_30px_rgba(0,212,255,0.2)] grayscale-[20%]"
            />
            
            {/* Interactive Hotspot Example */}
            <div className="absolute top-[20%] left-[50%] translate-x-[-50%]">
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-[0_0_15px_#00d4ff] animate-pulse"></div>
                <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur px-3 py-1 rounded border border-white/10 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  Sternum
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 px-6 py-3 rounded-full glassmorphism flex gap-4">
            <button className="material-symbols-outlined text-white hover:text-primary">rotate_right</button>
            <button className="material-symbols-outlined text-white hover:text-primary">zoom_in</button>
            <button className="material-symbols-outlined text-white hover:text-primary">zoom_out</button>
            <button className="material-symbols-outlined text-white hover:text-primary">layers</button>
          </div>
        </main>

        {/* Right Sidebar: Info */}
        <aside className="w-80 border-l border-white/10 p-5 bg-card-dark/50 flex flex-col overflow-y-auto">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 rounded-lg bg-cover bg-center border border-white/10" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=150&q=80")'}}></div>
            <div>
              <h2 className="text-xl font-bold text-white">Heart</h2>
              <p className="text-sm text-primary">Cardiovascular System</p>
            </div>
          </div>

          <div className="space-y-4">
             <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="flex items-center gap-2 text-sm font-bold mb-2 text-white">
                   <span className="material-symbols-outlined text-lg text-primary">info</span> Description
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                   The heart is a muscular organ that pumps blood through the circulatory system's blood vessels. Blood carries oxygen and nutrients to the body.
                </p>
             </div>

             <div className="p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                <h3 className="flex items-center gap-2 text-sm font-bold text-white">
                   <span className="material-symbols-outlined text-lg text-secondary">track_changes</span> Function
                </h3>
             </div>
             
             <div className="mt-auto pt-4">
               <button className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-blue-500 text-background-dark font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                 <span className="material-symbols-outlined">smart_toy</span>
                 Ask AI Assistant
               </button>
             </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;