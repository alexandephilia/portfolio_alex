import React, { useEffect, useRef, useState } from 'react';

type MonthKey = 'may' | 'jun' | 'jul' | 'aug';

interface BudgetMonthData {
    totalBudget: number;
    spent: number;
}

type BudgetDataMap = Record<string, BudgetMonthData>;

// Mock Data
const budgetData: BudgetDataMap = {
    may: { totalBudget: 9200, spent: 7800 },
    jun: { totalBudget: 11000, spent: 5200 },
    jul: { totalBudget: 10354, spent: 4625 },
    aug: { totalBudget: 12000, spent: 3100 }
};

const monthLabels: Record<MonthKey, string> = {
    may: 'May',
    jun: 'June',
    jul: 'July',
    aug: 'August'
};

// Shared premium gradient style to ensure consistency across UI elements
const premiumGradientStyle = {
    background: 'linear-gradient(180deg, rgba(38, 38, 38, 1) 0%, rgba(23, 23, 23, 1) 50%, rgba(10, 10, 10, 1) 100%)',
    boxShadow: '0 1px 0 0 rgba(255, 255, 255, 0.05) inset, 0 -1px 0 0 rgba(0, 0, 0, 0.5) inset, 0 4px 6px -1px rgba(0, 0, 0, 0.4)'
};

const BudgetCard: React.FC = () => {
    const [selectedMonth, setSelectedMonth] = useState<MonthKey>('jul');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentData = budgetData[selectedMonth];
    const remaining = currentData.totalBudget - currentData.spent;
    const percentage = Math.round((currentData.spent / currentData.totalBudget) * 100);

    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(amount);
    };

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative w-full max-w-[440px]">
            {/* Card outer glow */}
            <div className="absolute inset-[-30px] bg-purple-600/5 blur-[60px] rounded-[80px] opacity-30"></div>

            {/* Card Container - Reduced border opacity to 0.02 for a subtle rim */}
            <div className="relative p-[10px] rounded-[36px] bg-black/40 border border-white/[0.02] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.9)] backdrop-blur-[40px] transition-all duration-500 overflow-hidden">

                {/* Inner highlight */}
                <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-neutral-800/10 blur-[60px] pointer-events-none"></div>

                {/* Main Card Content */}
                <article className="relative bg-[#0c0c0c] rounded-[32px] p-8 flex flex-col gap-6 shadow-[inset_0_1px_2px_rgba(255,255,255,0.04)]">

                    {/* Header */}
                    <header className="flex flex-col gap-0.5">
                        <div className="flex justify-between items-center w-full">
                            <h2 className="text-neutral-500 font-medium text-[11px] tracking-wider uppercase">
                                Monthly Budget
                            </h2>

                            {/* Month Selector */}
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-all duration-200 py-0.5 px-2 border border-white/5 rounded-[6px] focus:outline-none relative overflow-hidden group"
                                    style={premiumGradientStyle}
                                >
                                    {/* Inner shine for consistent premium feel */}
                                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50"></div>

                                    <span className="text-[11px] font-medium tracking-tight relative z-10">{monthLabels[selectedMonth]}</span>
                                    <svg
                                        className={`w-2 h-2 transition-transform duration-300 relative z-10 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>

                                {/* Dropdown Menu */}
                                <div
                                    className={`absolute right-0 top-full mt-3 w-32 bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 transition-all duration-300 origin-top-right ${isDropdownOpen
                                            ? 'opacity-100 scale-100 translate-y-0'
                                            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                                        }`}
                                >
                                    {(Object.keys(budgetData) as MonthKey[]).map((key) => (
                                        <button
                                            key={key}
                                            onClick={() => {
                                                setSelectedMonth(key);
                                                setIsDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2.5 text-xs flex items-center justify-between transition-colors hover:bg-white/5 ${selectedMonth === key ? 'text-purple-400 font-semibold' : 'text-neutral-400'
                                                }`}
                                        >
                                            {monthLabels[key]}
                                            {selectedMonth === key && (
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Total Budget */}
                        <section>
                            <h1 className="raised-text text-[56px] font-normal tracking-tighter leading-[1] tabular-nums mt-2">
                                {formatCurrency(currentData.totalBudget)}
                            </h1>
                        </section>
                    </header>

                    {/* Progress Bar */}
                    <section>
                        <div className="space-y-3">
                            <label className="text-[10px] font-medium text-neutral-500 tracking-wider uppercase">
                                Monthly spending limit
                            </label>
                            <div className="h-[8px] w-full bg-[#181818] rounded-full overflow-visible relative">

                                {/* Base Track */}
                                <div className="absolute inset-0 bg-[#222] rounded-full overflow-hidden border border-white/5">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-[#310e61] via-[#8b5cf6] to-[#e9d5ff] relative z-10"
                                        style={{ width: `${percentage}%`, transition: 'width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                                    ></div>
                                </div>

                                {/* Layer 1: Wide Ambient Spread */}
                                <div
                                    className="absolute top-1/2 rounded-full z-0 pointer-events-none"
                                    style={{
                                        left: `${percentage}%`,
                                        width: '60px',
                                        height: '24px',
                                        transform: 'translate(-50%, -50%)',
                                        transition: 'left 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                        background: 'radial-gradient(ellipse 100% 100%, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0.12) 40%, rgba(139,92,246,0.04) 70%, transparent 100%)',
                                        filter: 'blur(8px)'
                                    }}
                                ></div>

                                {/* Layer 2: Secondary Spread */}
                                <div
                                    className="absolute top-1/2 rounded-full z-5 pointer-events-none glow-breath"
                                    style={{
                                        left: `${percentage}%`,
                                        width: '40px',
                                        height: '20px',
                                        transform: 'translate(-50%, -50%)',
                                        transition: 'left 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                        background: 'radial-gradient(ellipse 100% 100%, rgba(167,139,250,0.4) 0%, rgba(167,139,250,0.2) 35%, rgba(139,92,246,0.08) 60%, transparent 100%)',
                                        filter: 'blur(5px)'
                                    }}
                                ></div>

                                {/* Layer 3: Core Glow */}
                                <div
                                    className="absolute top-1/2 rounded-full z-10 pointer-events-none glow-pulse"
                                    style={{
                                        left: `${percentage}%`,
                                        width: '24px',
                                        height: '16px',
                                        transform: 'translate(-50%, -50%)',
                                        transition: 'left 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                        background: 'radial-gradient(ellipse 100% 100%, rgba(196,181,253,0.8) 0%, rgba(196,181,253,0.5) 30%, rgba(167,139,250,0.2) 60%, transparent 100%)',
                                        filter: 'blur(3px)'
                                    }}
                                ></div>

                                {/* Layer 4: Highlight Ring */}
                                <div
                                    className="absolute top-1/2 rounded-full z-15 pointer-events-none"
                                    style={{
                                        left: `${percentage}%`,
                                        width: '14px',
                                        height: '14px',
                                        transform: 'translate(-50%, -50%)',
                                        transition: 'left 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                        background: 'radial-gradient(circle, transparent 30%, rgba(233,213,255,0.4) 50%, rgba(233,213,255,0.6) 60%, transparent 75%)',
                                        filter: 'blur(1px)'
                                    }}
                                ></div>

                                {/* Layer 5: Inner Bright Core */}
                                <div
                                    className="absolute top-1/2 rounded-full z-20 pointer-events-none"
                                    style={{
                                        left: `${percentage}%`,
                                        width: '10px',
                                        height: '10px',
                                        transform: 'translate(-50%, -50%)',
                                        transition: 'left 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                        background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(233,213,255,0.7) 40%, rgba(196,181,253,0.3) 70%, transparent 100%)',
                                        filter: 'blur(1.5px)'
                                    }}
                                ></div>

                                {/* Layer 6: Hot Center Point */}
                                <div
                                    className="absolute top-1/2 rounded-full z-25 pointer-events-none"
                                    style={{
                                        left: `${percentage}%`,
                                        width: '5px',
                                        height: '5px',
                                        transform: 'translate(-50%, -50%)',
                                        transition: 'left 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                        background: 'white',
                                        filter: 'blur(0.5px)',
                                        boxShadow: '0 0 3px 1px rgba(255,255,255,0.9), 0 0 6px 2px rgba(233,213,255,0.6)'
                                    }}
                                ></div>

                                {/* Layer 7: Horizontal Light Streak */}
                                <div
                                    className="absolute top-1/2 z-8 pointer-events-none"
                                    style={{
                                        left: `${percentage}%`,
                                        width: '50px',
                                        height: '6px',
                                        transform: 'translate(-50%, -50%)',
                                        transition: 'left 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                        background: 'linear-gradient(90deg, transparent 0%, rgba(196,181,253,0.15) 20%, rgba(233,213,255,0.35) 45%, rgba(255,255,255,0.5) 50%, rgba(233,213,255,0.35) 55%, rgba(196,181,253,0.15) 80%, transparent 100%)',
                                        filter: 'blur(2px)',
                                        borderRadius: '50%'
                                    }}
                                ></div>

                                {/* Layer 8: Top Surface Highlight */}
                                <div
                                    className="absolute z-22 pointer-events-none"
                                    style={{
                                        left: `${percentage}%`,
                                        top: '0px',
                                        width: '16px',
                                        height: '4px',
                                        transform: 'translateX(-50%)',
                                        transition: 'left 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.3) 70%, transparent 100%)',
                                        filter: 'blur(1px)',
                                        borderRadius: '50%'
                                    }}
                                ></div>
                            </div>
                        </div>
                    </section>

                    {/* Stats Section */}
                    <section className="grid grid-cols-2 pt-1">
                        <div className="flex flex-col gap-1.5">
                            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-500">Spent</span>
                            <div className="flex items-center gap-2">
                                <span className="text-[15px] font-normal tabular-nums leading-none raised-text-light">
                                    {formatCurrency(currentData.spent)}
                                </span>

                                <span
                                    className="percentage-badge relative overflow-hidden text-[9px] font-bold px-1 py-px rounded-[4px] border border-white/10 flex items-center justify-center -translate-y-0.5"
                                    style={premiumGradientStyle}
                                >
                                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-b from-white/20 to-transparent opacity-50"></div>
                                    <span className="relative z-10 leading-none raised-text-xs">{percentage}%</span>
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5 items-end">
                            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-500">Remaining</span>
                            <span className="text-[15px] font-normal tabular-nums leading-none raised-text-light">
                                {formatCurrency(remaining)}
                            </span>
                        </div>
                    </section>

                    {/* Premium Button */}
                    <footer className="flex justify-center">
                        <button className="premium-button w-auto py-2 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500/30">
                            <div className="button-shine"></div>
                            <div className="button-inner-shadow rounded-full"></div>
                            <span className="button-text text-[11px] font-semibold tracking-widest uppercase">View Details</span>
                        </button>
                    </footer>
                </article>
            </div>

            {/* Bottom Glow */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[100%] h-32 bg-purple-600/5 blur-[110px] -z-10"></div>
        </div>
    );
};

// Full showcase with background - EXACT copy from original App.tsx
export const BudgetCardShowcase: React.FC = () => {
    return (
        <div className="w-full h-full bg-[#030303] flex items-center justify-center p-8 relative overflow-hidden">

            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('https://r2.flowith.net/gemini-proxy-go/1767044206425/d8652e42-8edd-4ebd-aa73-3a34ffa3d336.jpg')" }}
            ></div>
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Background Effects */}
            <div className="absolute top-[-15%] right-[-10%] w-[70%] h-[70%] bg-purple-600/8 rounded-full blur-[180px]"></div>
            <div className="absolute bottom-[-15%] left-[-15%] w-[60%] h-[60%] bg-blue-600/8 rounded-full blur-[160px]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff06_1px,transparent_1px)] [background-size:40px_40px] opacity-15"></div>

            <BudgetCard />
        </div>
    );
};
