import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, PenLine, Plus, Send, Trash2, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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

// Notion-like Editor Component
const NotionEditor: React.FC<{
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}> = ({ value, onChange, placeholder }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [showPlaceholder, setShowPlaceholder] = useState(!value);
    const [isAtLineStart, setIsAtLineStart] = useState(true);

    useEffect(() => {
        if (editorRef.current && !value) {
            editorRef.current.innerHTML = '';
        }
    }, []);

    const handleInput = () => {
        if (editorRef.current) {
            const text = editorRef.current.innerText;
            onChange(text);
            setShowPlaceholder(!text);

            // Check if cursor is at line start
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const textBeforeCursor = range.startContainer.textContent?.slice(0, range.startOffset) || '';
                const lastNewline = textBeforeCursor.lastIndexOf('\n');
                const lineStart = lastNewline === -1 ? 0 : lastNewline + 1;
                const currentLineText = textBeforeCursor.slice(lineStart);
                setIsAtLineStart(currentLineText.length === 0 || text.length === 0);
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            document.execCommand('insertText', false, '  ');
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text/plain');
        document.execCommand('insertText', false, text);
    };

    return (
        <div className="relative min-h-[300px]">
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                onFocus={() => setShowPlaceholder(!value)}
                onBlur={() => setShowPlaceholder(!value)}
                className="w-full min-h-[300px] outline-none text-[15px] leading-[1.8] text-gray-800 whitespace-pre-wrap"
                style={{ caretColor: '#111' }}
                suppressContentEditableWarning
            />
            {showPlaceholder && (
                <div className="absolute top-0 left-0 pointer-events-none text-gray-300 text-[15px] flex items-center gap-2">
                    <span>{placeholder || "Write something..."}</span>
                </div>
            )}
            {isAtLineStart && value && (
                <div className="absolute bottom-4 left-0 pointer-events-none">
                    <span className="text-[11px] text-gray-300 bg-gray-50 px-2 py-1 rounded-md">
                        Type <span className="font-mono text-gray-400">/</span> for commands, <span className="font-mono text-gray-400">**bold**</span>, <span className="font-mono text-gray-400">*italic*</span>
                    </span>
                </div>
            )}
        </div>
    );
};

// Markdown renderer with custom styles
const MarkdownContent: React.FC<{ content: string }> = ({ content }) => {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                h1: ({ children }) => <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-3 first:mt-0">{children}</h1>,
                h2: ({ children }) => <h2 className="text-xl font-bold text-gray-900 mt-5 mb-2">{children}</h2>,
                h3: ({ children }) => <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">{children}</h3>,
                p: ({ children }) => <p className="text-gray-700 leading-[1.8] mb-4 last:mb-0">{children}</p>,
                ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1 text-gray-700">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1 text-gray-700">{children}</ol>,
                li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-gray-200 pl-4 my-4 italic text-gray-600">{children}</blockquote>
                ),
                code: ({ className, children }) => {
                    const isInline = !className;
                    if (isInline) {
                        return <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>;
                    }
                    return (
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto mb-4">
                            <code className="text-sm font-mono">{children}</code>
                        </pre>
                    );
                },
                a: ({ href, children }) => (
                    <a href={href} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>
                ),
                strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
                em: ({ children }) => <em className="italic">{children}</em>,
                hr: () => <hr className="my-6 border-gray-200" />,
            }}
        >
            {content}
        </ReactMarkdown>
    );
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
            if (selectedWriting?.id === id) setSelectedWriting(null);
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

    // Get plain text preview from markdown
    const getPreview = (content: string) => {
        return content
            .replace(/#{1,6}\s/g, '')
            .replace(/\*\*([^*]+)\*\*/g, '$1')
            .replace(/\*([^*]+)\*/g, '$1')
            .replace(/`([^`]+)`/g, '$1')
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            .replace(/>\s/g, '')
            .slice(0, 200);
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
                        className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-[10px] md:text-xs font-medium transition-all bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 shadow-[0_2px_4px_rgba(0,0,0,0.2),0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.1)] text-white hover:from-gray-700 hover:to-gray-800 hover:shadow-[0_3px_6px_rgba(0,0,0,0.25),0_1px_2px_rgba(0,0,0,0.15)] active:shadow-sm active:translate-y-[1px]"
                    >
                        <Plus size={14} />
                        New Writing
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

            {/* Add Form Modal - Notion Style */}
            <Portal>
                <AnimatePresence>
                    {showAddForm && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] flex items-start justify-center pt-[5vh] md:pt-[10vh] px-4 overflow-y-auto"
                            onClick={() => setShowAddForm(false)}
                        >
                            <motion.form
                                initial={{ scale: 0.98, opacity: 0, y: 10 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.98, opacity: 0, y: 10 }}
                                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                                onClick={(e) => e.stopPropagation()}
                                onSubmit={handleSubmit}
                                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mb-10"
                            >
                                {/* Title Input - Notion Style */}
                                <div className="px-8 pt-8">
                                    <input
                                        type="text"
                                        placeholder="Untitled"
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                        className="w-full text-4xl font-bold text-gray-900 placeholder-gray-300 outline-none border-none bg-transparent"
                                        autoFocus
                                    />
                                </div>

                                {/* Content Editor - Notion Style */}
                                <div className="px-8 py-6">
                                    <NotionEditor
                                        value={newContent}
                                        onChange={setNewContent}
                                        placeholder="Start writing, or press '/' for commands..."
                                    />
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between px-8 py-4 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl">
                                    <div className="text-xs text-gray-400">
                                        Supports **bold**, *italic*, # headings, - lists, &gt; quotes
                                    </div>
                                    <div className="flex gap-3">
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
                                            className="flex items-center gap-2 px-5 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                        >
                                            {isSubmitting ? (
                                                <Loader2 size={16} className="animate-spin" />
                                            ) : (
                                                <Send size={16} />
                                            )}
                                            Publish
                                        </button>
                                    </div>
                                </div>
                            </motion.form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Portal>

            {/* Reading Modal with Markdown */}
            <Portal>
                <AnimatePresence>
                    {selectedWriting && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] flex items-start justify-center pt-[5vh] md:pt-[10vh] px-4 overflow-y-auto"
                            onClick={() => setSelectedWriting(null)}
                        >
                            <motion.article
                                initial={{ scale: 0.98, opacity: 0, y: 10 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.98, opacity: 0, y: 10 }}
                                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mb-10 overflow-hidden"
                            >
                                {/* Header */}
                                <div className="px-8 pt-8 pb-4 border-b border-gray-100">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <h1 className="text-3xl md:text-4xl font-serif italic text-gray-900 leading-tight">
                                                {selectedWriting.title}
                                            </h1>
                                            <div className="flex items-center gap-3 mt-4 text-sm text-gray-400">
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
                                </div>

                                {/* Content with Markdown */}
                                <div className="px-8 py-8">
                                    <MarkdownContent content={selectedWriting.content} />
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
                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-600 transition-colors leading-snug">
                                        {writing.title}
                                    </h3>
                                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                                        <span>{formatDate(writing.createdAt)}</span>
                                        <span>·</span>
                                        <span>{getReadingTime(writing.content)}</span>
                                    </div>
                                    <div className="relative mt-3">
                                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                                            {getPreview(writing.content)}
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
                                        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg md:opacity-0 md:group-hover:opacity-100 transition-all flex-shrink-0"
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
