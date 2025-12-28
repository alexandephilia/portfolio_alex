import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, PenLine, Plus, Send, Trash2, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Writing } from '../types';

const API_URL = '/api/writings';

// Portal component for modals
const Portal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!mounted) return null;
    return ReactDOM.createPortal(children, document.body);
};

export const Writings: React.FC = () => {
    const [writings, setWritings] = useState<Writing[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminKey, setAdminKey] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedWriting, setSelectedWriting] = useState<Writing | null>(null);

    // Check for admin key in URL on mount or sessionStorage
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const key = params.get('key');
        if (key) {
            setAdminKey(key);
            setIsAdmin(true);
            sessionStorage.setItem('adminKey', key);
            window.history.replaceState({}, '', window.location.pathname);
        } else {
            const storedKey = sessionStorage.getItem('adminKey');
            if (storedKey) {
                setAdminKey(storedKey);
                setIsAdmin(true);
            }
        }
    }, []);

    useEffect(() => {
        fetchWritings();
    }, []);

    const fetchWritings = async () => {
        try {
            setIsLoading(true);
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            setWritings(data);
        } catch (err) {
            setError('Failed to load writings');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle.trim() || !newContent.trim()) return;

        setIsSubmitting(true);
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminKey}`,
                },
                body: JSON.stringify({ title: newTitle, content: newContent }),
            });

            if (!res.ok) {
                if (res.status === 401) {
                    setError('Invalid admin key');
                    setIsAdmin(false);
                    return;
                }
                throw new Error('Failed to create');
            }

            const newWriting = await res.json();
            setWritings(prev => [newWriting, ...prev]);
            setNewTitle('');
            setNewContent('');
            setShowAddForm(false);
        } catch (err) {
            setError('Failed to add writing');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm('Delete this writing?')) return;

        try {
            const res = await fetch(API_URL, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminKey}`,
                },
                body: JSON.stringify({ id }),
            });

            if (!res.ok) throw new Error('Failed to delete');
            setWritings(prev => prev.filter(w => w.id !== id));
        } catch (err) {
            setError('Failed to delete writing');
        }
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;

        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getReadingTime = (content: string) => {
        const wordsPerMinute = 200;
        const words = content.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes} min read`;
    };

    if (isLoading) {
        return (
            <div className="p-6 md:p-10 flex items-center justify-center min-h-[300px]">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <div className="p-6 md:p-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-serif italic text-gray-900">Writings</h2>
                    <p className="text-xs text-gray-400 mt-1">Thoughts, ideas, and reflections</p>
                </div>
                {isAdmin && (
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-all shadow-lg"
                    >
                        <Plus size={16} />
                        New
                    </button>
                )}
            </div>

            {/* Error */}
            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                    {error}
                    <button onClick={() => setError(null)} className="ml-2 underline">Dismiss</button>
                </div>
            )}

            {/* Add Form Modal */}
            <Portal>
                <AnimatePresence>
                    {showAddForm && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
                            onClick={() => setShowAddForm(false)}
                        >
                            <motion.form
                                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                onClick={(e) => e.stopPropagation()}
                                onSubmit={handleSubmit}
                                className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
                            >
                                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                                    <h3 className="font-serif italic text-xl text-gray-900">New Writing</h3>
                                    <button
                                        type="button"
                                        onClick={() => setShowAddForm(false)}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <X size={20} className="text-gray-400" />
                                    </button>
                                </div>
                                <div className="p-5 space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 font-serif text-lg"
                                        autoFocus
                                    />
                                    <textarea
                                        placeholder="Write your thoughts..."
                                        value={newContent}
                                        onChange={(e) => setNewContent(e.target.value)}
                                        rows={10}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 resize-none leading-relaxed"
                                    />
                                </div>
                                <div className="flex justify-end gap-3 p-5 border-t border-gray-100 bg-gray-50/50">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddForm(false)}
                                        className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !newTitle.trim() || !newContent.trim()}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        {isSubmitting ? (
                                            <Loader2 size={16} className="animate-spin" />
                                        ) : (
                                            <Send size={16} />
                                        )}
                                        Publish
                                    </button>
                                </div>
                            </motion.form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Portal>

            {/* Reading Modal */}
            <Portal>
                <AnimatePresence>
                    {selectedWriting && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
                            onClick={() => setSelectedWriting(null)}
                        >
                            <motion.article
                                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col"
                            >
                                <div className="flex items-start justify-between p-6 border-b border-gray-100">
                                    <div className="flex-1 pr-4">
                                        <h2 className="font-serif italic text-2xl md:text-3xl text-gray-900 leading-tight">
                                            {selectedWriting.title}
                                        </h2>
                                        <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                                            <span>{formatDate(selectedWriting.createdAt)}</span>
                                            <span>·</span>
                                            <span>{getReadingTime(selectedWriting.content)}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedWriting(null)}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                                    >
                                        <X size={20} className="text-gray-400" />
                                    </button>
                                </div>
                                <div className="p-6 overflow-y-auto flex-1">
                                    <div className="prose prose-gray max-w-none">
                                        <p className="text-gray-700 leading-[1.8] whitespace-pre-wrap text-[15px]">
                                            {selectedWriting.content}
                                        </p>
                                    </div>
                                </div>
                            </motion.article>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Portal>

            {/* Writings List */}
            {writings.length === 0 ? (
                <div className="text-center py-20">
                    <PenLine className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-400 text-sm font-serif italic">No writings yet</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {writings.map((writing, index) => (
                        <motion.article
                            key={writing.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => setSelectedWriting(writing)}
                            className="group cursor-pointer"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-serif italic text-xl text-gray-900 group-hover:text-gray-600 transition-colors leading-snug">
                                        {writing.title}
                                    </h3>
                                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                                        <span>{formatDate(writing.createdAt)}</span>
                                        <span>·</span>
                                        <span>{getReadingTime(writing.content)}</span>
                                    </div>
                                    <div className="relative mt-3">
                                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                                            {writing.content}
                                        </p>
                                        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#FAFAFA] to-transparent" />
                                    </div>
                                    <span className="inline-block mt-3 text-xs font-medium text-gray-900 group-hover:underline">
                                        Read more →
                                    </span>
                                </div>
                                {isAdmin && (
                                    <button
                                        onClick={(e) => handleDelete(writing.id, e)}
                                        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>
                            {index < writings.length - 1 && (
                                <div className="border-b border-dashed border-gray-200 mt-6" />
                            )}
                        </motion.article>
                    ))}
                </div>
            )}
        </div>
    );
};
