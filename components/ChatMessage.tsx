import React, { useState } from 'react';
import { Message, MessageRole } from '../types';

interface ChatMessageProps {
  message: Message;
}

const CodeBlock: React.FC<{ content: string; lang: string }> = ({ content, lang }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 rounded-lg my-2 relative">
      <div className="flex items-center justify-between px-4 py-1 bg-gray-800 rounded-t-lg">
        <span className="text-xs font-sans text-gray-400">{lang || 'code'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1 text-xs text-gray-400 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 text-sm overflow-x-auto text-white"><code className={`language-${lang}`}>{content}</code></pre>
    </div>
  );
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isModel = message.role === MessageRole.MODEL;
  const textContent = message.parts[0]?.text || '';

  const renderContent = (text: string) => {
    const parts = text.split(/(```[\w-]*\n[\s\S]*?\n```)/g);
    return parts.map((part, index) => {
      const codeBlockMatch = part.match(/```([\w-]*)\n([\s\S]*?)\n```/);
      if (codeBlockMatch) {
        const lang = codeBlockMatch[1];
        const content = codeBlockMatch[2];
        return <CodeBlock key={index} lang={lang} content={content} />;
      }
      return part.split('\n').map((line, i) => <p key={`${index}-${i}`}>{line}</p>);
    });
  };

  return (
    <div className={`flex items-start gap-4 my-4 ${isModel ? 'justify-start' : 'justify-end'}`}>
      {isModel && (
        <div className="w-8 h-8 rounded-full bg-brand-secondary flex-shrink-0 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.08V7.92c0-.41.47-.65.8-.4l5.63 3.08c.33.18.33.64 0 .82l-5.63 3.08c-.33.18-.8.05-.8-.32z"/></svg>
        </div>
      )}
      <div
        className={`max-w-xl md:max-w-2xl px-5 py-3 rounded-2xl shadow-md prose prose-invert prose-sm ${
          isModel ? 'bg-background-light rounded-tl-none' : 'bg-brand-primary text-white rounded-br-none'
        }`}
      >
        {textContent ? renderContent(textContent) : <div className="animate-pulse flex space-x-2"><div className="rounded-full bg-slate-700 h-2 w-2"></div><div className="rounded-full bg-slate-700 h-2 w-2"></div><div className="rounded-full bg-slate-700 h-2 w-2"></div></div>}
      </div>
    </div>
  );
};

export default ChatMessage;