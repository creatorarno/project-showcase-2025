import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
// Make sure this component exists in src/components/AnatomyScene.tsx
import { AnatomyScene } from '../components/AnatomyScene'; 

// 1. Define the data structure for your systems
type SystemInfo = {
  title: string;
  system: string;
  description: string;
  modelUrl: string; 
  icon: string;
};

const systemsData: Record<string, SystemInfo> = {
  Skeletal: {
    title: "Human Skeleton",
    system: "Skeletal System",
    description: "The internal framework of the human body. It is composed of around 270 bones at birth – this total decreases to around 206 bones by adulthood after some bones get fused together.",
    modelUrl: "https://cdn.pixabay.com/photo/2012/04/13/13/18/skeleton-32378_1280.png",
    icon: "skeleton"
  },
  Muscular: {
    title: "Muscular System",
    system: "Muscular System",
    description: "The biological system of an organism that allows for movement. The muscular system in vertebrates is controlled through the nervous system although some muscles can be completely autonomous.",
    modelUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Gnaeus_Pompeius_Magnus_Louvre_Ma1251.jpg/800px-Gnaeus_Pompeius_Magnus_Louvre_Ma1251.jpg",
    icon: "accessibility_new"
  },
  Nervous: {
    title: "Nervous Network",
    system: "Nervous System",
    description: "A highly complex part of an animal that coordinates its actions and sensory information by transmitting signals to and from different parts of its body.",
    modelUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Nervous_system_diagram.png/800px-Nervous_system_diagram.png",
    icon: "neurology"
  },
  Circulatory: {
    title: "Human Heart",
    system: "Circulatory System",
    description: "The heart is a muscular organ that pumps blood through the circulatory system's blood vessels. Blood carries oxygen and nutrients to the body while carrying metabolic waste.",
    // Ensure 'humanheart.glb' is inside your 'public/models/' folder
    modelUrl: "/models/humanheart.glb", 
    icon: "cardiology"
  },
  Digestive: {
    title: "Digestive Tract",
    system: "Digestive System",
    description: "The gastrointestinal tract plus the accessory organs of digestion (the tongue, salivary glands, pancreas, liver, and gallbladder). Digestion involves the breakdown of food into smaller components.",
    modelUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Digestive_system_diagram_en.svg/800px-Digestive_system_diagram_en.svg.png",
    icon: "gastroenterology"
  }
};

const Dashboard: React.FC = () => {
  const [activeSystem, setActiveSystem] = useState<string>('Skeletal');
  
  const currentData = systemsData[activeSystem];

  // Helper to check if the current item is a 3D model
  const is3DModel = currentData.modelUrl.endsWith('.glb') || currentData.modelUrl.endsWith('.gltf');

  return (
    <div className="flex flex-col h-screen bg-background-dark">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar: Systems */}
        <aside className="w-64 border-r border-white/10 p-4 flex flex-col gap-6 bg-card-dark/50">
          <div>
            <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">Systems</h2>
            <div className="space-y-2">
              {Object.keys(systemsData).map((sys) => (
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
                    {systemsData[sys].icon}
                  </span>
                  {sys}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Center: 3D Viewer Area or 2D Image */}
        <main className="flex-1 relative bg-[radial-gradient(circle_at_center,_rgba(0,212,255,0.1)_0%,_rgba(10,11,30,1)_70%)] flex items-center justify-center overflow-hidden">
          
          {/* CONDITIONAL RENDERING LOGIC */}
          {is3DModel ? (
            /* 3D Mode */
            <div className="w-full h-full absolute inset-0 animate-in fade-in duration-700">
               {/* Passes the GLB path to your AnatomyScene component */}
               <AnatomyScene modelUrl={currentData.modelUrl} />
               
               {/* 3D Specific Overlay Hint */}
               <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur px-4 py-1 rounded-full text-xs text-white/70 pointer-events-none border border-white/10">
                  Click & Drag to Rotate • Scroll to Zoom
               </div>
            </div>
          ) : (
            /* 2D Mode (Fallback for images) */
            <div className="relative group cursor-pointer transition-all duration-500 ease-in-out">
              <img 
                key={currentData.modelUrl} 
                src={currentData.modelUrl} 
                alt={currentData.title} 
                className="max-h-[75vh] w-auto opacity-90 drop-shadow-[0_0_30px_rgba(0,212,255,0.2)] animate-in fade-in zoom-in duration-500"
              />
              
              {/* 2D Hotspots (Only show on images) */}
              <div className="absolute top-[20%] left-[50%] translate-x-[-50%]">
                <div className="relative">
                  <div className="absolute -inset-4 bg-primary/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-[0_0_15px_#00d4ff] animate-pulse"></div>
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur px-3 py-1 rounded border border-white/10 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    Interactive Node
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Controls (Visible in both modes) */}
          <div className="absolute bottom-8 px-6 py-3 rounded-full glassmorphism flex gap-4 z-10">
            <button className="material-symbols-outlined text-white hover:text-primary" title="Reset View">rotate_right</button>
            <button className="material-symbols-outlined text-white hover:text-primary" title="Zoom In">zoom_in</button>
            <button className="material-symbols-outlined text-white hover:text-primary" title="Zoom Out">zoom_out</button>
          </div>
        </main>

        {/* Right Sidebar: Info */}
        <aside className="w-80 border-l border-white/10 p-5 bg-card-dark/50 flex flex-col overflow-y-auto z-20">
          <div className="flex items-start gap-4 mb-6">
            {/* Dynamic Thumbnail: Uses the image URL if it's an image, or a generic preview if it's 3D */}
            <div 
                className="w-16 h-16 rounded-lg bg-cover bg-center border border-white/10" 
                style={{
                  backgroundImage: `url("${is3DModel ? 'https://cdn-icons-png.flaticon.com/512/4825/4825038.png' : currentData.modelUrl}")`
                }}
            ></div>
            <div>
              <h2 className="text-xl font-bold text-white">{currentData.title}</h2>
              <p className="text-sm text-primary">{currentData.system}</p>
            </div>
          </div>

          <div className="space-y-4">
             <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="flex items-center gap-2 text-sm font-bold mb-2 text-white">
                   <span className="material-symbols-outlined text-lg text-primary">info</span> Description
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                   {currentData.description}
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
                 Ask AI about {currentData.title}
               </button>
             </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;