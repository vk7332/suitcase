import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger";
}

const Button: React.FC<ButtonProps> = ({
    variant = "primary",
    className = "",
    ...props
}) => {
    const styles = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white",
        secondary: "bg-gray-600 hover:bg-gray-700 text-white",
        danger: "bg-red-600 hover:bg-red-700 text-white",
    };

    return (
        <button
            className={`px-4 py-2 rounded-md ${styles[variant]} ${className}`}
            {...props}
        />
    );
};

export default Button;


