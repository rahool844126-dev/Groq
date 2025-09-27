import { Message, MessageRole } from '../types';

if (!process.env.GROQ_API_KEY) {
    console.warn("GROQ_API_KEY environment variable not set. The application will not function correctly.");
}

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const API_KEY = process.env.GROQ_API_KEY as string;

export async function* sendMessageToGroqStream(history: Message[]): AsyncGenerator<string> {
  const messagesForApi = history.map(msg => ({
    role: msg.role === MessageRole.MODEL ? 'assistant' : 'user',
    content: msg.parts[0].text,
  }));
  
  const systemMessage = {
      role: 'system',
      content: 'You are a helpful and friendly AI assistant. Format your responses clearly using markdown when appropriate.',
  };

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      messages: [systemMessage, ...messagesForApi],
      model: 'llama3-8b-8192',
      stream: true,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Groq API error: ${response.statusText} - ${errorText}`);
  }

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error('Failed to get response reader');
  }
  
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    
    buffer += decoder.decode(value, { stream: true });
    
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const jsonStr = line.substring(6).trim();
        if (jsonStr === '[DONE]') {
          return;
        }
        if (jsonStr) {
            try {
              const chunk = JSON.parse(jsonStr);
              const content = chunk.choices[0]?.delta?.content;
              if (content) {
                yield content;
              }
            } catch (e) {
              console.error('Failed to parse stream chunk:', jsonStr, e);
            }
        }
      }
    }
  }
}