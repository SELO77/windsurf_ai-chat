'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChatInput } from '@/components/chat/chat-input';
import { ChatMessage } from '@/components/chat/chat-message';
import { Character, Message } from '@/lib/db/schema';

interface ChatPageProps {
  params: {
    id: string;
  };
}

export default function ChatPage({ params }: ChatPageProps) {
  const [character, setCharacter] = useState<Character | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`/api/characters/${params.id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('캐릭터를 찾을 수 없습니다.');
          }
          throw new Error('캐릭터 정보를 가져오는데 실패했습니다.');
        }
        
        const data = await response.json();
        setCharacter(data);
        
        // Add initial system message
        const initialMessage: Message = {
          id: 0,
          chatId: 0,
          content: `안녕하세요! 저는 ${data.name}입니다. ${data.description}`,
          role: 'assistant',
          createdAt: new Date(),
        };
        
        setMessages([initialMessage]);
      } catch (err) {
        console.error('Error fetching character:', err);
        setError(err instanceof Error ? err.message : '캐릭터 정보를 가져오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacter();
  }, [params.id]);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!character) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      chatId: 0,
      content,
      role: 'user',
      createdAt: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsProcessing(true);
    
    try {
      // In a real app, you would send this to an API endpoint
      // that would process the message using an AI model
      // For now, we'll simulate a response
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a simple response based on character instructions
      let responseContent = '';
      
      // Simple response generation based on user input and character instructions
      if (content.includes('안녕') || content.includes('반가워')) {
        responseContent = `안녕하세요! 반가워요. 저는 ${character.name}입니다.`;
      } else if (content.includes('뭐해') || content.includes('뭐 하고 있어')) {
        responseContent = '당신과 대화하고 있어요. 더 이야기해 볼까요?';
      } else if (content.includes('이름') || content.includes('누구')) {
        responseContent = `제 이름은 ${character.name}입니다. ${character.description}`;
      } else if (content.includes('고마워') || content.includes('감사')) {
        responseContent = '천만에요! 더 도와드릴 일이 있을까요?';
      } else {
        // Default response using character instructions
        const instructions = character.instructions.split('.');
        const randomInstruction = instructions[Math.floor(Math.random() * instructions.length)].trim();
        responseContent = randomInstruction || '더 이야기해 주세요!';
      }
      
      const assistantMessage: Message = {
        id: messages.length + 2,
        chatId: 0,
        content: responseContent,
        role: 'assistant',
        createdAt: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Error processing message:', err);
      // Add error message
      const errorMessage: Message = {
        id: messages.length + 2,
        chatId: 0,
        content: '죄송합니다, 메시지를 처리하는 중 오류가 발생했습니다.',
        role: 'assistant',
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
        <div className="rounded-md bg-red-900/50 p-6 text-center text-red-200">
          <p className="mb-4">{error || '캐릭터를 찾을 수 없습니다.'}</p>
          <Link href="/">
            <button className="rounded-md bg-gray-700 px-4 py-2 hover:bg-gray-600">
              홈으로 돌아가기
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-800 p-4">
        <Link href="/" className="text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"></path>
          </svg>
        </Link>
        <div className="flex items-center">
          {character.imageUrl && (
            <div className="mr-2 h-8 w-8 overflow-hidden rounded-full">
              <Image
                src={character.imageUrl}
                alt={character.name}
                width={32}
                height={32}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <h1 className="text-lg font-medium">{character.name}</h1>
        </div>
        <Link href={`/edit/${character.id}`} className="text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
        </Link>
      </header>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message}
              characterName={character.name}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat input */}
      <div className="border-t border-gray-800 p-4">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isProcessing} />
      </div>
    </div>
  );
}
