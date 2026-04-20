import React from "react";

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="bg-white shadow-md rounded-xl p-6 border">
            {children}
        </div>
    );
};

export default Card;


