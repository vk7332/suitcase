// src/components/ui/error-boundary.tsx

import React from "react";

export default class ErrorBoundary extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: any) {
        console.error("UI Error:", error);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-6 text-center">
                    <h2 className="text-lg font-bold mb-2">
                        Something went wrong
                    </h2>
                    <p className="text-gray-500">
                        Please refresh the page
                    </p>
                </div>
            );
        }

        return this.props.children;
    }
}