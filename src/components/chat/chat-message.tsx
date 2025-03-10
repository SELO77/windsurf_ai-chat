import React from 'react';
import { cn } from '@/lib/utils';
import { Message } from '@/lib/db/schema';

interface ChatMessageProps {
  message: Message;
  characterName?: string;
}

export function ChatMessage({ message, characterName = 'Assistant' }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex w-full items-start gap-4 py-4',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'flex max-w-[80%] flex-col gap-2 rounded-lg p-4',
          isUser
            ? 'rounded-br-none bg-blue-500 text-white'
            : 'rounded-bl-none bg-gray-100 text-gray-900'
        )}
      >
        <div className="text-sm font-semibold">
          {isUser ? 'You' : characterName}
        </div>
        <div className="whitespace-pre-wrap">{message.content}</div>
      </div>
    </div>
  );
}
