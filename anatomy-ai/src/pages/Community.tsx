import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { supabase } from '../../utils/supabase';

// --- Types ---
interface Comment {
  id: number;
  user_id: string; // Needed to check ownership
  author_name: string;
  content: string;
  created_at: string;
}

interface Post {
  id: number;
  user_id: string;
  author_name: string;
  content: string;
  tags: string[];
  created_at: string;
  likes: { user_id: string }[];
  comments: Comment[];
}

const Community: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Create Post State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Comment State
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});
  const [visibleComments, setVisibleComments] = useState<Record<number, boolean>>({});

  const availableTags = ['#Neuroscience', '#Cardiology', '#SkeletalSystem', '#StudyHelp', '#Bugs'];

  // 1. Fetch Data
  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        likes (user_id),
        comments (id, user_id, author_name, content, created_at)
      `)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPosts(data as any);
    }
    setLoading(false);
  };

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
        setUser(user);
        fetchPosts();
    });
  }, []);

  // 2. Create Post Logic
  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;
    
    const { error } = await supabase.from('posts').insert({
      user_id: user.id,
      author_name: user.user_metadata.full_name || 'Anonymous',
      content: newPostContent,
      tags: selectedTags
    });

    if (!error) {
      setNewPostContent('');
      setSelectedTags([]);
      setIsModalOpen(false);
      fetchPosts();
    }
  };

  // 3. Like Logic
  const handleLike = async (postId: number) => {
    if (!user) return;
    const post = posts.find(p => p.id === postId);
    const isLiked = post?.likes.some(l => l.user_id === user.id);

    if (isLiked) {
      await supabase.from('likes').delete().match({ post_id: postId, user_id: user.id });
    } else {
      await supabase.from('likes').insert({ post_id: postId, user_id: user.id });
    }
    fetchPosts();
  };

  // 4. Comment Logic
  const handleComment = async (postId: number) => {
    const content = commentInputs[postId];
    if (!content?.trim() || !user) return;

    const { error } = await supabase.from('comments').insert({
      post_id: postId,
      user_id: user.id,
      author_name: user.user_metadata.full_name || 'Anonymous',
      content: content
    });

    if (!error) {
      setCommentInputs(prev => ({ ...prev, [postId]: '' }));
      fetchPosts();
    }
  };

  // 5. Delete Logic
  const handleDeletePost = async (postId: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    
    const { error } = await supabase.from('posts').delete().eq('id', postId);
    if (!error) {
        setPosts(posts.filter(p => p.id !== postId));
    } else {
        alert("Error deleting post: " + error.message);
    }
  };

  const handleDeleteComment = async (commentId: number, postId: number) => {
    if (!confirm("Delete this comment?")) return;

    const { error } = await supabase.from('comments').delete().eq('id', commentId);
    if (!error) {
        fetchPosts();
    }
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="min-h-screen bg-background-dark pb-10 font-display relative">
      <Navbar />
      
      <div className="fixed inset-0 animated-grid bg-grid-pattern opacity-10 pointer-events-none"></div>

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 relative z-10">
        
        {/* Sidebar */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="glassmorphism p-6 rounded-2xl flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px]">
               <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl text-white">person</span>
               </div>
            </div>
            <div>
              <h2 className="font-bold text-lg text-white">{user?.user_metadata?.full_name || 'Guest User'}</h2>
              <p className="text-xs text-gray-400">Anatomy Student</p>
            </div>
          </div>
          
          <div className="glassmorphism p-4 rounded-2xl">
            <h3 className="font-bold mb-4 px-2 text-white">Trending Topics</h3>
            <div className="flex flex-wrap gap-2">
               {availableTags.map(tag => (
                 <span key={tag} className="px-3 py-1 text-xs rounded-full bg-white/5 text-gray-400 border border-white/10">
                   {tag}
                 </span>
               ))}
            </div>
          </div>
        </aside>

        {/* Main Feed */}
        <main className="lg:col-span-6 space-y-6">
          
          {/* Create Post Trigger */}
          <div 
            onClick={() => setIsModalOpen(true)}
            className="glassmorphism p-4 rounded-2xl flex items-center gap-4 cursor-text hover:bg-white/5 transition-colors"
          >
             <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-gray-400">edit</span>
             </div>
             <p className="text-gray-400 text-sm">Start a discussion or ask a question...</p>
          </div>

          {loading ? (
             <div className="text-center text-primary py-10 animate-pulse">Loading Community...</div>
          ) : posts.length === 0 ? (
             <div className="text-center text-gray-500 py-10">No posts yet. Be the first!</div>
          ) : (
            posts.map((post) => {
              const isLiked = user && post.likes.some(l => l.user_id === user.id);
              const commentsOpen = visibleComments[post.id];
              const isOwner = user && post.user_id === user.id;

              return (
                <div key={post.id} className="glassmorphism p-6 rounded-2xl border border-white/10 group">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                        {post.author_name.charAt(0)}
                        </div>
                        <div>
                        <h4 className="font-bold text-primary">{post.author_name}</h4>
                        <p className="text-xs text-gray-400">{new Date(post.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                    
                    {/* Delete Post Button */}
                    {isOwner && (
                        <button 
                            onClick={(e) => { e.stopPropagation(); handleDeletePost(post.id); }}
                            className="text-gray-500 hover:text-red-400 p-2 rounded-full hover:bg-white/5 transition-colors"
                            title="Delete Post"
                        >
                            <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                    )}
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4 whitespace-pre-wrap">
                    {post.content}
                  </p>

                  <div className="flex gap-2 mb-4 flex-wrap">
                    {post.tags && post.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex gap-6">
                      <button 
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-2 text-sm transition-colors ${isLiked ? 'text-red-400' : 'text-gray-400 hover:text-white'}`}
                      >
                        <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}>thumb_up</span> 
                        {post.likes.length}
                      </button>
                      
                      <button 
                        onClick={() => setVisibleComments(prev => ({...prev, [post.id]: !prev[post.id]}))}
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        <span className="material-symbols-outlined text-xl">chat_bubble</span> 
                        {post.comments.length}
                      </button>
                    </div>
                  </div>

                  {/* Comments Section */}
                  {commentsOpen && (
                    <div className="mt-4 pt-4 border-t border-white/5 animate-in slide-in-from-top-2 fade-in">
                       <div className="space-y-3 mb-4 max-h-60 overflow-y-auto custom-scrollbar">
                          {post.comments.map(comment => {
                             // Check comment ownership
                             const isCommentOwner = user && comment.user_id === user.id;
                             return (
                                <div key={comment.id} className="bg-black/20 p-3 rounded-lg relative">
                                    <div className="flex justify-between items-baseline mb-1 pr-6">
                                        <span className="text-xs font-bold text-primary">{comment.author_name}</span>
                                        <span className="text-[10px] text-gray-500">{new Date(comment.created_at).toLocaleTimeString()}</span>
                                    </div>
                                    <p className="text-xs text-gray-300">{comment.content}</p>
                                    
                                    {/* 👇 Delete Comment Button: Always Visible for Owner */}
                                    {isCommentOwner && (
                                        <button 
                                            onClick={() => handleDeleteComment(comment.id, post.id)}
                                            className="absolute top-2 right-2 text-gray-600 hover:text-red-400 p-1 rounded hover:bg-white/5 transition-colors"
                                            title="Delete Comment"
                                        >
                                            <span className="material-symbols-outlined text-sm">delete</span>
                                        </button>
                                    )}
                                </div>
                             );
                          })}
                          {post.comments.length === 0 && <p className="text-xs text-gray-500 italic">No comments yet.</p>}
                       </div>

                       <div className="flex gap-2">
                          <input 
                             type="text" 
                             value={commentInputs[post.id] || ''}
                             onChange={(e) => setCommentInputs(prev => ({...prev, [post.id]: e.target.value}))}
                             placeholder="Write a comment..."
                             className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary/50"
                             onKeyDown={(e) => e.key === 'Enter' && handleComment(post.id)}
                          />
                          <button 
                             onClick={() => handleComment(post.id)}
                             className="p-2 rounded-lg bg-white/10 hover:bg-primary hover:text-black text-white transition-colors"
                          >
                             <span className="material-symbols-outlined text-lg">send</span>
                          </button>
                       </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </main>

        {/* Right Sidebar (Unchanged) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6">
           <div className="glassmorphism p-5 rounded-2xl">
             <h3 className="font-bold mb-4 text-white">Recommended Resources</h3>
             <div className="space-y-3">
                <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                   <p className="text-sm font-bold text-primary">3D Heart Anatomy</p>
                   <p className="text-xs text-gray-400">Interactive Module</p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                   <p className="text-sm font-bold text-primary">Neural Pathways</p>
                   <p className="text-xs text-gray-400">Video Lecture</p>
                </div>
             </div>
           </div>
        </aside>
      </div>

      {/* Create Post Modal (Unchanged) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="w-full max-w-lg glassmorphism p-6 rounded-2xl border border-white/10 shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center mb-4">
                 <h3 className="text-xl font-bold text-white">Create Post</h3>
                 <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                    <span className="material-symbols-outlined">close</span>
                 </button>
              </div>
              
              <textarea 
                 className="w-full h-32 bg-black/30 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary resize-none mb-4"
                 placeholder="What's on your mind?"
                 value={newPostContent}
                 onChange={(e) => setNewPostContent(e.target.value)}
              ></textarea>

              <div className="mb-6">
                 <p className="text-xs text-gray-400 mb-2 uppercase font-bold">Select Tags</p>
                 <div className="flex flex-wrap gap-2">
                    {availableTags.map(tag => (
                       <button 
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1 rounded-full text-xs border transition-all ${selectedTags.includes(tag) ? 'bg-primary text-black border-primary' : 'bg-transparent text-gray-400 border-white/20 hover:border-white'}`}
                       >
                          {tag}
                       </button>
                    ))}
                 </div>
              </div>

              <button 
                 onClick={handleCreatePost}
                 disabled={!newPostContent.trim()}
                 className="w-full py-3 rounded-xl bg-primary text-background-dark font-bold hover:shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                 Post to Community
              </button>
           </div>
        </div>
      )}

      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 lg:hidden z-40 h-14 w-14 rounded-full bg-primary text-background-dark shadow-neon flex items-center justify-center hover:scale-110 transition-transform"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>

    </div>
  );
};

export default Community;