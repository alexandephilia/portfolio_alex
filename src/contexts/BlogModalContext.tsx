import React, { createContext, useContext, useState } from 'react';
import { BlogPost } from '../types/blog';
import { BlogModal } from '../components/BlogModal';

interface BlogModalContextType {
  openBlogModal: (post: BlogPost) => void;
  closeBlogModal: () => void;
}

const BlogModalContext = createContext<BlogModalContextType | undefined>(undefined);

export const useBlogModal = () => {
  const context = useContext(BlogModalContext);
  if (!context) {
    throw new Error('useBlogModal must be used within a BlogModalProvider');
  }
  return context;
};

export const BlogModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const openBlogModal = (post: BlogPost) => {
    setSelectedPost(post);
  };

  const closeBlogModal = () => {
    setSelectedPost(null);
  };

  return (
    <BlogModalContext.Provider value={{ openBlogModal, closeBlogModal }}>
      {children}
      <BlogModal post={selectedPost} onClose={closeBlogModal} />
    </BlogModalContext.Provider>
  );
}; 