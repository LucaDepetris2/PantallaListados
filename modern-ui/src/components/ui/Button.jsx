import React from 'react';

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium text-xs transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-offset-1";

    const variants = {
        primary: "bg-primary text-white border-transparent hover:bg-primary-dark shadow-sm focus:ring-primary",
        secondary: "bg-white text-slate-700 border-slate-300 hover:bg-slate-50 focus:ring-slate-400",
        outline: "bg-transparent text-slate-500 border-dashed border-slate-300 hover:text-primary hover:border-primary focus:ring-primary",
        ghost: "bg-transparent text-slate-500 border-transparent hover:bg-slate-100 hover:text-slate-700",
        icon: "p-1.5 text-slate-500 hover:bg-slate-100 hover:text-primary rounded-full border-transparent"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
