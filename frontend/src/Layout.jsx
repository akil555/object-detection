// src/Layout.jsx
import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white p-4">
                <div className="container mx-auto">
                    <h1 className="text-2xl font-bold">Image Processor</h1>
                </div>
            </header>
            <main className="py-8">
                <div className="container mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
