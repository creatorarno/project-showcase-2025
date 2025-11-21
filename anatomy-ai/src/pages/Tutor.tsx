import React, { useEffect } from 'react';
import { Navbar } from '../components/Navbar';

const Tutor: React.FC = () => {

  // 1. Load Zapier Script on Mount
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js";
    script.type = "module";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup script when leaving page (optional, but good practice)
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-background-dark">
      <Navbar />
      <main className="flex-1 p-6 flex gap-6 overflow-hidden">
        
        {/* Left: AI Video Avatar */}
        <div className="flex-[2] flex flex-col gap-6">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 shadow-neon">
             {/* Placeholder for AI Video */}
             <img src="https://cdn.midjourney.com/5c83d616-965a-413c-afca-00924b48801d/0_1.png" 
                  className="w-full h-full object-cover opacity-80" 
                  alt="AI Avatar"
                  onError={(e) => {e.currentTarget.src = 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80'}} 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
             <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:scale-110 transition-transform">
               <span className="material-symbols-outlined text-4xl text-white">play_arrow</span>
             </button>
             <div className="absolute bottom-6 left-6 right-6">
                <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                   <div className="h-full w-[30%] bg-primary"></div>
                </div>
             </div>
          </div>
          
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
             <span className="material-symbols-outlined text-primary">lightbulb</span>
             <p className="text-sm text-text-muted">Suggestion: "Explain the difference between systemic and pulmonary circulation."</p>
          </div>
        </div>

        {/* Right: Chat Interface (ZAPIER EMBED) */}
        <div className="flex-1 flex flex-col rounded-2xl bg-card-dark border border-white/10 shadow-lg overflow-hidden relative">
          
          {/* Zapier Chatbot Container */}
          {/* We use h-full to ensure it fills the card */}
          <div className="w-full h-full bg-white/5">
            {/* @ts-ignore - Custom Element from Zapier */}
            <zapier-interfaces-chatbot-embed
              is-popup='false'
              chatbot-id='cmi8deye4006u9vv6dbgsmjar' 
              style={{ width: '100%', height: '100%' }}
            />
          </div>

        </div>

      </main>
    </div>
  );
};

export default Tutor;