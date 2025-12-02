import React from 'react';

export const Input = ({ className = '', ...props }) => {
    return (
        <input
            className={`w-full px-2 py-1 text-xs border border-slate-300 rounded-md text-slate-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all ${className}`}
            {...props}
        />
    );
};
