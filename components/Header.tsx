import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-background-light shadow-md p-4 flex items-center justify-between z-10">
            <div className="flex items-center space-x-3">
                <svg
                    className="w-8 h-8 text-brand-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.08V7.92c0-.41.47-.65.8-.4l5.63 3.08c.33.18.33.64 0 .82l-5.63 3.08c-.33.18-.8.05-.8-.32z"/>
                </svg>
                <h1 className="text-2xl font-bold text-text-primary tracking-tight">
                    Groq Chatbot
                </h1>
            </div>
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                Deploy on Vercel
            </a>
        </header>
    );
};

export default Header;