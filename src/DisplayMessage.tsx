import React from 'react';
import './DisplayMessage.css'

type Message = {
  id: number;
  text: string;
  author: 'user' | 'bot';
};

type Props = {
  messages: Message[];
};

const MessageList: React.FC<Props> = ({ messages }) => {
  return (
    <div>
      {messages.map((message) => (
        <div key={message.id} className={`message ${message.author}`}>
          {message.text}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
