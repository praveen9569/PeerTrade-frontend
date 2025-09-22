import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import socketService from '../../services/socket';

const Chat = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recipientInfo, setRecipientInfo] = useState(null);
  const messagesEndRef = useRef(null);

  // Connect to socket when component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { state: { from: `/chat/${userId}` } });
      return;
    }

    // For demo purposes, load mock conversation data
    const mockMessages = [
      {
        id: '1',
        text: 'Hi there! I\'m interested in your laptop.',
        senderId: 'user1',
        recipientId: userId || 'user2',
        timestamp: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: '2',
        text: 'Hello! Yes, it\'s still available.',
        senderId: userId || 'user2',
        recipientId: 'user1',
        timestamp: new Date(Date.now() - 3000000).toISOString()
      },
      {
        id: '3',
        text: 'Great! Is the price negotiable?',
        senderId: 'user1',
        recipientId: userId || 'user2',
        timestamp: new Date(Date.now() - 2400000).toISOString()
      }
    ];
    
    const mockRecipient = {
      id: 'user1',
      name: 'John Doe',
      avatar: 'https://via.placeholder.com/40'
    };
    
    // Simulate loading delay
    setTimeout(() => {
      setMessages(mockMessages);
      setRecipientInfo(mockRecipient);
      setLoading(false);
    }, 800);

    // Uncomment this when real backend is available
    
    // Connect to socket
    socketService.connect();

    // Load conversation history
    socketService.getConversationHistory(userId, (data) => {
      setMessages(data.messages || []);
      setRecipientInfo(data.recipient || null);
      setLoading(false);
    });

    // Listen for new messages
    socketService.onMessage((data) => {
      if (data.senderId === userId || data.recipientId === userId) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    });

    // Cleanup on unmount
    return () => {
      socketService.disconnect();
    };
    
  }, [userId, navigate]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // For demo purposes, simulate sending a message
    const currentUser = JSON.parse(localStorage.getItem('user')) || { id: 'user2' };
    
    const newMessageObj = {
      id: Date.now().toString(),
      text: newMessage,
      senderId: currentUser.id,
      recipientId: userId || 'user1',
      timestamp: new Date().toISOString()
    };
    
    // Add message to the conversation
    setMessages(prevMessages => [...prevMessages, newMessageObj]);
    setNewMessage('');
    
    // Simulate reply after 1 second
    setTimeout(() => {
      const replyMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Thanks for your message! I\'ll get back to you soon.',
        senderId: userId || 'user1',
        recipientId: currentUser.id,
        timestamp: new Date().toISOString()
      };
      setMessages(prevMessages => [...prevMessages, replyMessage]);
    }, 1000);

    // Uncomment this when real backend is available
    
    const messageData = {
      text: newMessage,
      recipientId: userId
    };

    socketService.sendMessage(messageData);
    setNewMessage('');
    
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-error mb-4">{error}</p>
        <button 
          onClick={() => navigate(-1)} 
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-surface-light dark:bg-surface-dark rounded-lg shadow-md">
      {/* Chat header */}
      <div className="flex items-center p-4 border-b border-neutral-light dark:border-neutral-dark">
        <button 
          onClick={() => navigate(-1)} 
          className="mr-4 text-primary hover:text-primary-dark transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div>
          <h2 className="text-xl font-semibold">
            {recipientInfo?.name || 'Chat'}
          </h2>
          {recipientInfo?.isOnline && (
            <span className="text-sm text-success">Online</span>
          )}
        </div>
      </div>

      {/* Messages container */}
      <div className="h-[60vh] overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <p className="text-center text-neutral-dark dark:text-neutral-light">
            No messages yet. Start the conversation!
          </p>
        ) : (
          messages.map((msg, index) => {
            const isSentByMe = msg.senderId !== userId;
            return (
              <div 
                key={index} 
                className={`flex ${isSentByMe ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[70%] p-3 rounded-lg ${
                    isSentByMe 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-neutral-light dark:bg-neutral-dark rounded-tl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className={`text-xs ${isSentByMe ? 'text-white/70' : 'text-neutral-dark/70 dark:text-neutral-light/70'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-3 rounded-lg border border-neutral-light dark:border-neutral-dark bg-white dark:bg-surface-dark focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          disabled={!newMessage.trim()}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Chat;