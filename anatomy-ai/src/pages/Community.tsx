import React from 'react';
import { Navbar } from '../components/Navbar';

const Community: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-dark pb-10">
      <Navbar />
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        
        {/* Profile Sidebar */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="glassmorphism p-6 rounded-2xl flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-cover bg-center ring-2 ring-primary" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80")'}}></div>
            <div>
              <h2 className="font-bold text-lg">Alex Mercer</h2>
              <p className="text-xs text-text-muted">Anatomy Scholar</p>
            </div>
          </div>
          
          <div className="glassmorphism p-4 rounded-2xl">
            <h3 className="font-bold mb-4 px-2">Categories</h3>
            <nav className="space-y-1">
              <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary border-l-4 border-primary">
                <span className="material-symbols-outlined">checklist</span> All Posts
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-text-muted hover:bg-white/5 hover:text-white transition-colors">
                <span className="material-symbols-outlined">accessibility_new</span> Muscular System
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-text-muted hover:bg-white/5 hover:text-white transition-colors">
                <span className="material-symbols-outlined">psychology</span> Neuroscience
              </a>
            </nav>
          </div>
        </aside>

        {/* Feed */}
        <main className="lg:col-span-6 space-y-6">
          {/* Filter Pills */}
          <div className="flex gap-3 overflow-x-auto pb-2">
             <button className="px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium whitespace-nowrap">🧠 AI Recommended</button>
             <button className="px-4 py-1.5 rounded-full bg-white/5 text-text-muted hover:text-white text-sm font-medium whitespace-nowrap">💡 Questions</button>
             <button className="px-4 py-1.5 rounded-full bg-white/5 text-text-muted hover:text-white text-sm font-medium whitespace-nowrap">🔥 Trending</button>
          </div>

          {/* Post 1 */}
          <div className="glassmorphism p-6 rounded-2xl border-l-4 border-secondary">
            <div className="flex gap-3 mb-4">
               <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" className="w-10 h-10 rounded-full object-cover"/>
               <div>
                 <h4 className="font-bold text-primary">Dr. Evelyn Reed</h4>
                 <p className="text-xs text-text-muted">2 hours ago</p>
               </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Question about the Kreb's Cycle</h3>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              I'm having a bit of trouble understanding the role of Acetyl-CoA in the Kreb's cycle within the VR simulation. Can anyone explain it in simpler terms?
            </p>
            <div className="flex gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs">#DigestiveSystem</span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs">#StudyHelp</span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
               <div className="flex gap-4">
                 <button className="flex items-center gap-1 text-text-muted hover:text-primary"><span className="material-symbols-outlined text-lg">thumb_up</span> 12</button>
                 <button className="flex items-center gap-1 text-text-muted hover:text-primary"><span className="material-symbols-outlined text-lg">chat_bubble</span> 3</button>
               </div>
            </div>
          </div>

           {/* Post 2 */}
           <div className="glassmorphism p-6 rounded-2xl">
            <div className="flex gap-3 mb-4">
               <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80" className="w-10 h-10 rounded-full object-cover"/>
               <div>
                 <h4 className="font-bold text-primary">Jane Doe</h4>
                 <p className="text-xs text-text-muted">1 day ago</p>
               </div>
            </div>
            <h3 className="text-xl font-bold mb-2">VR Simulation Glitch: Skeletal System</h3>
            <div className="aspect-video w-full rounded-lg bg-gray-800 mb-4 overflow-hidden">
               <img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover opacity-50"/>
            </div>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              Femur bone rendering seems incorrect in the latest patch.
            </p>
            <div className="flex gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs">#Bugs</span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
               <div className="flex gap-4">
                 <button className="flex items-center gap-1 text-text-muted hover:text-primary"><span className="material-symbols-outlined text-lg">thumb_up</span> 5</button>
                 <button className="flex items-center gap-1 text-text-muted hover:text-primary"><span className="material-symbols-outlined text-lg">chat_bubble</span> 8</button>
               </div>
            </div>
          </div>

        </main>

        {/* Trending Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6">
           <div className="glassmorphism p-5 rounded-2xl">
             <h3 className="font-bold mb-4">Trending Tags</h3>
             <div className="flex flex-wrap gap-2">
               {['#Neuroscience', '#Cardiology', '#VRUpdate', '#Exams'].map(tag => (
                 <span key={tag} className="px-3 py-1 text-xs rounded-full bg-white/5 text-text-muted hover:text-primary hover:bg-primary/10 cursor-pointer transition-colors">{tag}</span>
               ))}
             </div>
           </div>
        </aside>

      </div>
    </div>
  );
};

export default Community;