import React, { useState } from 'react';

export default function InputMessage() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [conversation, setConversation] = useState<{ role: string, content: string }[]>([]);

  const sendMessage = async (event: { preventDefault: () => void; }) => {
    event.preventDefault(); // デフォルトのフォーム送信を防ぐ
    const newMessage = { role: 'user', content: message };
    setConversation(conv => [...conv, newMessage]);
    try {

      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body:JSON.stringify({ message })
      });
      
      if (!response.ok)
      throw Error(await response.text());
    
      const data = await response.json();
      console.log(data);

      const newResponse = { role: 'assistant', content: data };
      setConversation(conv => [...conv, newResponse]);
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const newResponse = { role: 'assistant', content: errorMessage };
      setConversation(conv => [...conv, newResponse]);
      }
    }
    setMessage('')
  };

  return (
    <div>
      <div className="conversation">
        {conversation.map((msg, index) => (
          <div key={index} className={msg.role}>{msg.content}</div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit" disabled={!message}>Send</button>
      </form>
    </div>
  );
}