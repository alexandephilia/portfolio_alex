import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, PenLine, Plus, Send, Trash2, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Writing } from '../types';

const API_URL = '/api/writings';

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
    const [expandedId, setExpandedId] = useState<string | null>(null);

    // Check for admin key in URL on mount or sessionStorage
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const key = params.get('key');
        if (key) {
            setAdminKey(key);
            setIsAdmin(true);
            // Store in sessionStorage for tab switches
            sessionStorage.setItem('adminKey', key);
            // Clean URL without reload
            window.history.replaceState({}, '', window.location.pathname);
        } else {
            // Check sessionStorage for existing key
            const storedKey = sessionStorage.getItem('adminKey');
            if (storedKey) {
                setAdminKey(storedKey);
                setIsAdmin(true);
            }
        }
    }, []);

    // Fetch writings
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

    const handleDelete = async (id: string) => {
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
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
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
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-bold text-gray-900">Writings</h2>
                    <p className="text-xs text-gray-400 mt-1">Thoughts, ideas, and reflections</p>
                </div>
                {isAdmin && (
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-gray-300 hover:shadow-sm transition-all"
                    >
                        <Plus size={16} />
                        Add Writing
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
            <AnimatePresence>
                {showAddForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowAddForm(false)}
                    >
                        <motion.form
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            onSubmit={handleSubmit}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
                        >
                            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                                <h3 className="font-bold text-gray-900">New Writing</h3>
                                <button
                                    type="button"
                                    onClick={() => setShowAddForm(false)}
                                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X size={20} className="text-gray-400" />
                                </button>
                            </div>
                            <div className="p-4 space-y-4">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    autoFocus
                                />
                                <textarea
                                    placeholder="Write your thoughts..."
                                    value={newContent}
                                    onChange={(e) => setNewContent(e.target.value)}
                                    rows={8}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                                />
                            </div>
                            <div className="flex justify-end gap-2 p-4 border-t border-gray-100 bg-gray-50">
                                <button
                                    type="button"
                                    onClick={() => setShowAddForm(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !newTitle.trim() || !newContent.trim()}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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

            {/* Writings List */}
            {writings.length === 0 ? (
                <div className="text-center py-16">
                    <PenLine className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-400 text-sm">No writings yet</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {writings.map((writing, index) => (
                        <motion.article
                            key={writing.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group bg-white border border-gray-100 rounded-2xl p-5 hover:border-gray-200 hover:shadow-sm transition-all"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-900 mb-1">{writing.title}</h3>
                                    <p className="text-xs text-gray-400 mb-3">{formatDate(writing.createdAt)}</p>
                                    <div
                                        className={`text-sm text-gray-600 leading-relaxed whitespace-pre-wrap ${expandedId === writing.id ? '' : 'line-clamp-3'
                                            }`}
                                    >
                                        {writing.content}
                                    </div>
                                    {writing.content.length > 200 && (
                                        <button
                                            onClick={() => setExpandedId(expandedId === writing.id ? null : writing.id)}
                                            className="text-xs text-blue-500 hover:text-blue-600 mt-2 font-medium"
                                        >
                                            {expandedId === writing.id ? 'Show less' : 'Read more'}
                                        </button>
                                    )}
                                </div>
                                {isAdmin && (
                                    <button
                                        onClick={() => handleDelete(writing.id)}
                                        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>
                        </motion.article>
                    ))}
                </div>
            )}
        </div>
    );
};
