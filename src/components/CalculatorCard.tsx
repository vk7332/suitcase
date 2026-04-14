import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CalculatorCardProps {
    title: string;
    description?: string;
    icon: LucideIcon;
    onClick: () => void;
    variant?: 'blue' | 'green' | 'orange' | 'purple';
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({
    title,
    description,
    icon: Icon,
    onClick,
    variant = 'blue'
}) => {
    // Map variants to specific brand colors for your tax practice
    const colors = {
        blue: 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100',
        green: 'bg-green-50 text-green-600 border-green-100 hover:bg-green-100',
        orange: 'bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-100',
        purple: 'bg-purple-50 text-purple-600 border-purple-100 hover:bg-purple-100',
    };

    return (
        <button
            onClick={onClick}
            className={`
        flex flex-col items-center justify-center p-6 
        bg-white border rounded-xl shadow-sm transition-all duration-200 
        hover:shadow-md hover:-translate-y-1 group
        w-full h-full min-h-[160px] text-center
      `}
        >
            {/* Symmetrical Icon Container */}
            <div className={`
        w-14 h-14 rounded-full flex items-center justify-center mb-4
        transition-colors duration-200 ${colors[variant]}
      `}>
                <Icon size={28} strokeWidth={2} />
            </div>

            {/* Title with Fixed Line Height for Symmetry */}
            <h3 className="text-sm font-semibold text-slate-800 leading-tight">
                {title}
            </h3>

            {description && (
                <p className="mt-2 text-xs text-slate-500 line-clamp-2">
                    {description}
                </p>
            )}
        </button>
    );
};

export default CalculatorCard;
