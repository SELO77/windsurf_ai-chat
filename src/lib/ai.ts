import { Message, Character } from './db/schema';

// Prepare system message for character
function prepareSystemMessage(character: Character) {
  return `You are ${character.name}. ${character.description}

${character.instructions}

Please stay in character at all times. Your responses should reflect the personality, knowledge, and mannerisms of ${character.name}.`;
}

// Convert database messages to AI SDK format
function formatMessages(messages: Message[], character: Character) {
  const formattedMessages = messages.map((message) => ({
    role: message.role as 'user' | 'assistant',
    content: message.content,
  }));

  // Add system message at the beginning
  return [
    { role: 'system', content: prepareSystemMessage(character) },
    ...formattedMessages,
  ];
}

// Generate AI response
export async function generateCharacterResponse(messages: Message[], character: Character) {
  const formattedMessages = formatMessages(messages, character);

  try {
    // In a real implementation, this would use the OpenAI API
    // For now, we'll simulate a response
    const simulatedResponse = `Hello! I am ${character.name}. How can I help you today?`;
    
    // Simulate a delay to mimic API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return simulatedResponse;
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw error;
  }
}
