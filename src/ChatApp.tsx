import React, { useState } from 'react';
import DisplayMessage from './DisplayMessage';
import InputMessage from './InputMessage';
import './ChatApp.css'

type Message = {
  id: number;
  text: string;
  author: 'user' | 'bot';
};

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = (newMessageText: string) => {
    const newMessage: Message = {
      id: messages.length + 1, // 簡易的なID生成。実際にはもっと複雑なID生成が望ましい
      text: newMessageText,
      author: 'user'
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div>
      <DisplayMessage messages={messages} />
      <InputMessage />
    </div>
  );
};

export default ChatApp;
