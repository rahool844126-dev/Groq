import React, { useState, useEffect, useCallback } from 'react';
import { Message, MessageRole } from './types';
import { sendMessageToGroqStream } from './services/geminiService';
import Header from './components/Header';
import ChatHistory from './components/ChatHistory';
import ChatInput from './components/ChatInput';
import ApiKeyBanner from './components/ApiKeyBanner';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isApiKeyAvailable = process.env.GROQ_API_KEY && process.env.GROQ_API_KEY.length > 0;

  useEffect(() => {
    if (isApiKeyAvailable) {
      setMessages([
        {
          role: MessageRole.MODEL,
          parts: [{ text: "Hello! I'm a chatbot powered by Groq. How can I help you today?" }],
        },
      ]);
    }
  }, [isApiKeyAvailable]);
  
  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) {
      return;
    }

    setIsLoading(true);
    setError(null);

    const userMessage: Message = {
      role: MessageRole.USER,
      parts: [{ text }],
    };
    
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    try {
      const stream = sendMessageToGroqStream(newMessages);
      
      let modelResponse = '';
      setMessages(prevMessages => [...prevMessages, { role: MessageRole.MODEL, parts: [{ text: '' }] }]);

      for await (const chunk of stream) {
        modelResponse += chunk;
        setMessages(prevMessages => {
          const updatedMessages = [...prevMessages];
          updatedMessages[updatedMessages.length - 1].parts[0].text = modelResponse;
          return updatedMessages;
        });
      }

    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
        setError(`Failed to get response: ${errorMessage}`);
        setMessages(prevMessages => {
            const newMessages = [...prevMessages];
            if (newMessages.length > 0 && newMessages[newMessages.length - 1].role === MessageRole.MODEL && newMessages[newMessages.length - 1].parts[0].text === '') {
                newMessages.pop();
            }
            return newMessages;
        });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages]);

  return (
    <div className="flex flex-col h-screen bg-background-dark text-text-primary font-sans">
      <Header />
      {!isApiKeyAvailable ? (
        <ApiKeyBanner />
      ) : (
        <div className="flex-1 flex flex-col overflow-hidden">
          <ChatHistory messages={messages} isLoading={isLoading} />
          <div className="w-full max-w-4xl mx-auto p-4 md:p-6">
            {error && <div className="text-red-500 text-center mb-4">{error}</div>}
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;