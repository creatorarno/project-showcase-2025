import React, { useState, useRef } from 'react';
import { Navbar } from '../components/Navbar';
import { AnatomyScene, type AnatomySceneRef } from '../components/AnatomyScene';
import { useNavigate } from 'react-router-dom'; 

type SystemInfo = {
  title: string;
  system: string;
  description: string;
  modelUrl: string; 
  icon: string;
  scale?: number | [number, number, number]; 
};

const systemsData: Record<string, SystemInfo> = {
  Skeletal: {
    title: "Human Skeleton",
    system: "Skeletal System",
    description: "The internal framework of the human body. It is composed of around 270 bones at birth...",
    modelUrl: "models/skeleton.glb",
    icon: "skeleton",
    scale: 0.6 
  },
  Muscular: {
    title: "Muscular System",
    system: "Muscular System",
    description: "The biological system of an organism that allows for movement...",
    modelUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Gnaeus_Pompeius_Magnus_Louvre_Ma1251.jpg/800px-Gnaeus_Pompeius_Magnus_Louvre_Ma1251.jpg",
    icon: "accessibility_new"
  },
  Nervous: {
    title: "Nervous Network",
    system: "Nervous System",
    description: "A highly complex part of an animal that coordinates its actions...",
    modelUrl: "/models/brain.glb",
    icon: "neurology",
    scale: 1
  },
  Circulatory: {
    title: "Human Heart",
    system: "Circulatory System",
    description: "The heart is a muscular organ that pumps blood through the circulatory system's blood vessels...",
    modelUrl: "/models/heart_animated.glb", 
    icon: "cardiology",
    scale: 0.01
  },
  Digestive: {
    title: "Digestive Tract",
    system: "Digestive System",
    description: "The gastrointestinal tract plus the accessory organs of digestion...",
    modelUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Digestive_system_diagram_en.svg/800px-Digestive_system_diagram_en.svg.png",
    icon: "gastroenterology"
  }
};

const Dashboard: React.FC = () => {
  const [activeSystem, setActiveSystem] = useState<string>('Skeletal');
  const [isPanMode, setIsPanMode] = useState(false); // <--- New State for Pan Mode
  
  const currentData = systemsData[activeSystem];
  const is3DModel = currentData.modelUrl.endsWith('.glb') || currentData.modelUrl.endsWith('.gltf');

  const sceneRef = useRef<AnatomySceneRef>(null);
  const navigate = useNavigate();

  // Button Handlers
  const handleRotate = () => { if (is3DModel) sceneRef.current?.rotate(); };
  const handleZoomIn = () => { if (is3DModel) sceneRef.current?.zoomIn(); };
  const handleZoomOut = () => { if (is3DModel) sceneRef.current?.zoomOut(); };
  const handleReset = () => { if (is3DModel) sceneRef.current?.reset(); };
  
  const togglePan = () => {
      setIsPanMode(!isPanMode);
  };

  return (
    <div className="flex flex-col h-screen bg-background-dark">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar */}
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

        {/* Main Viewer */}
        <main className="flex-1 relative bg-[radial-gradient(circle_at_center,_rgba(0,212,255,0.1)_0%,_rgba(10,11,30,1)_70%)] flex items-center justify-center overflow-hidden">
          
          {is3DModel ? (
            <div className="w-full h-full absolute inset-0 animate-in fade-in duration-700">
               {/* Pass panMode to scene */}
               <AnatomyScene 
                  ref={sceneRef} 
                  modelUrl={currentData.modelUrl} 
                  scale={currentData.scale}
                  panMode={isPanMode} 
               />
               
               {/* Overlay Helper Text */}
               <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur px-4 py-1 rounded-full text-xs text-white/70 pointer-events-none border border-white/10 transition-opacity">
                  {isPanMode ? "Mode: PAN (Drag to Move)" : "Mode: ROTATE (Drag to Spin)"}
               </div>
            </div>
          ) : (
            <div className="relative group cursor-pointer transition-all duration-500 ease-in-out">
              <img 
                key={currentData.modelUrl} 
                src={currentData.modelUrl} 
                alt={currentData.title} 
                className="max-h-[75vh] w-auto opacity-90 drop-shadow-[0_0_30px_rgba(0,212,255,0.2)] animate-in fade-in zoom-in duration-500"
              />
               <div className="absolute top-[20%] left-[50%] translate-x-[-50%]">
                  <div className="relative">
                    <div className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-[0_0_15px_#00d4ff] animate-pulse"></div>
                  </div>
               </div>
            </div>
          )}

          {/* 4. Connected Buttons */}
          <div className="absolute bottom-8 px-6 py-3 rounded-full glassmorphism flex gap-4 z-10">
            <button 
                onClick={handleReset} 
                className="material-symbols-outlined text-white hover:text-primary transition-colors" 
                title="Reset View"
            >
                layers
            </button>
            
            {/* NEW PAN TOGGLE BUTTON */}
            <button 
                onClick={togglePan} 
                className={`material-symbols-outlined transition-colors ${isPanMode ? 'text-primary' : 'text-white hover:text-primary'}`}
                title="Toggle Pan/Move"
            >
                drag_pan
            </button>

            <button 
                onClick={handleRotate} 
                className="material-symbols-outlined text-white hover:text-primary transition-colors" 
                title="Rotate 45°"
            >
                rotate_right
            </button>
            
            <button 
                onClick={handleZoomIn} 
                className="material-symbols-outlined text-white hover:text-primary transition-colors" 
                title="Zoom In"
            >
                zoom_out
            </button>
            
            <button 
                onClick={handleZoomOut} 
                className="material-symbols-outlined text-white hover:text-primary transition-colors" 
                title="Zoom Out"
            >
                zoom_in
            </button>
          </div>
        </main>

        {/* Right Sidebar Info (Keep exactly as is) */}
        <aside className="w-80 border-l border-white/10 p-5 bg-card-dark/50 flex flex-col overflow-y-auto z-20">
          <div className="flex items-start gap-4 mb-6">
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
                <p className="text-sm text-text-muted leading-relaxed">{currentData.description}</p>
             </div>
             <div className="mt-auto pt-4">
               <button 
                 onClick={() => navigate('/tutor')} 
                 className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-blue-500 text-background-dark font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
               >
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