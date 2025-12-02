import React from 'react';
import { ChevronDown } from 'lucide-react';

export const Select = ({ children, className = '', ...props }) => {
    return (
        <div className="relative">
            <select
                className={`w-full appearance-none px-2 py-1 text-xs border border-slate-300 rounded-md text-slate-700 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all pr-6 ${className}`}
                {...props}
            >
                {children}
            </select>
            <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
        </div>
    );
};
