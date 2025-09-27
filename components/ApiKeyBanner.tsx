import React from 'react';

const ApiKeyBanner: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-yellow-900/30 border border-yellow-700 text-yellow-200 rounded-lg p-6 text-center shadow-lg">
        <div className="flex justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">API Key Not Found</h2>
        <p className="mb-4">
          The Groq API key is missing. Please configure it as an environment variable to use this chatbot.
        </p>
        <div className="bg-background-light p-4 rounded-md text-left">
          <p className="font-semibold mb-2">For Vercel Deployment:</p>
          <ol className="list-decimal list-inside text-sm space-y-1">
            <li>Go to your project's settings on Vercel.</li>
            <li>Navigate to the "Environment Variables" section.</li>
            <li>Add a new variable with the key <code className="bg-gray-700 px-1.5 py-0.5 rounded-md text-yellow-300">GROQ_API_KEY</code>.</li>
            <li>Paste your Groq API key as the value.</li>
            <li>Redeploy your application for the changes to take effect.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyBanner;