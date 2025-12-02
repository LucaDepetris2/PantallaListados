import React from 'react';

export const Card = ({ children, className = '' }) => {
    return (
        <div className={`bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col ${className}`}>
            {children}
        </div>
    );
};

export const CardHeader = ({ children, className = '' }) => {
    return (
        <div className={`px-3 py-2 bg-slate-50 border-b border-slate-200 flex items-center gap-2 ${className}`}>
            {children}
        </div>
    );
};

export const CardBody = ({ children, className = '' }) => {
    return (
        <div className={`p-3 flex-1 overflow-hidden ${className}`}>
            {children}
        </div>
    );
};
