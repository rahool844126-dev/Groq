import React from 'react';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-4 my-4 justify-start">
        <div className="w-8 h-8 rounded-full bg-brand-secondary flex-shrink-0 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.08V7.92c0-.41.47-.65.8-.4l5.63 3.08c.33.18.33.64 0 .82l-5.63 3.08c-.33.18-.8.05-.8-.32z"/></svg>
        </div>
        <div className="max-w-xl md:max-w-2xl px-5 py-3 rounded-2xl shadow-md bg-background-light rounded-tl-none">
            <div className="flex space-x-1 items-center">
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
            </div>
        </div>
    </div>
  );
};

export default LoadingIndicator;