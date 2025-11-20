import React from 'react';
import { Navbar } from '../components/Navbar';

const Tutor: React.FC = () => {
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

        {/* Right: Chat Interface */}
        <div className="flex-1 flex flex-col rounded-2xl bg-card-dark border border-white/10 shadow-lg overflow-hidden">
          <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold border border-primary/30">AI</div>
                <div>
                  <h3 className="font-bold text-sm">Anatomy Tutor</h3>
                  <p className="text-xs text-green-400 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400"></span> Online</p>
                </div>
             </div>
             <button className="text-text-muted hover:text-white"><span className="material-symbols-outlined">more_vert</span></button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
             {/* AI Message */}
             <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 shrink-0"></div>
                <div className="flex flex-col gap-1 max-w-[85%]">
                   <div className="p-3 rounded-2xl rounded-tl-none bg-white/10 text-sm leading-relaxed">
                     Hello! I am your personal anatomy tutor. What would you like to explore today? I can load 3D models or explain complex systems.
                   </div>
                   <span className="text-xs text-text-muted ml-1">10:30 AM</span>
                </div>
             </div>

             {/* User Message */}
             <div className="flex gap-3 flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-secondary/50 shrink-0"></div>
                <div className="flex flex-col gap-1 items-end max-w-[85%]">
                   <div className="p-3 rounded-2xl rounded-tr-none bg-primary text-background-dark font-medium text-sm">
                     Tell me about the human skull structure.
                   </div>
                   <span className="text-xs text-text-muted mr-1">10:31 AM</span>
                </div>
             </div>
          </div>

          <div className="p-4 border-t border-white/10 bg-background-dark">
             <div className="relative">
               <input 
                 type="text" 
                 placeholder="Ask anything about anatomy..." 
                 className="w-full bg-white/5 border-none rounded-xl py-3 pl-4 pr-12 text-sm focus:ring-1 focus:ring-primary text-white placeholder-text-muted"
               />
               <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                 <span className="material-symbols-outlined">send</span>
               </button>
             </div>
             <div className="flex gap-4 mt-3 px-1">
               <button className="text-text-muted hover:text-white"><span className="material-symbols-outlined text-xl">mic</span></button>
               <button className="text-text-muted hover:text-white"><span className="material-symbols-outlined text-xl">attach_file</span></button>
             </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Tutor;