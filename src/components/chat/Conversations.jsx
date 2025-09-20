import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import socketService from '../../services/socket';

const Conversations = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { state: { from: '/messages' } });
      return;
    }

    // Connect to socket
    socketService.connect();

    // Get all conversations
    socketService.socket.emit('get all conversations');
    socketService.socket.on('all conversations', (data) => {
      setConversations(data || []);
      setLoading(false);
    });

    // Listen for new messages to update conversation list
    socketService.onMessage(() => {
      socketService.socket.emit('get all conversations');
    });

    return () => {
      socketService.socket.off('all conversations');
    };
  }, [navigate]);

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
          onClick={() => navigate('/')} 
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      
      {conversations.length === 0 ? (
        <div className="text-center py-10 bg-surface-light dark:bg-surface-dark rounded-lg shadow-md">
          <p className="text-neutral-dark dark:text-neutral-light mb-4">You don't have any conversations yet.</p>
          <Link 
            to="/products" 
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-md divide-y divide-neutral-light dark:divide-neutral-dark">
          {conversations.map((conversation) => (
            <Link 
              key={conversation.userId} 
              to={`/chat/${conversation.userId}`}
              className="flex items-center p-4 hover:bg-neutral-light/20 dark:hover:bg-neutral-dark/20 transition"
            >
              <div className="relative">
                <img 
                  src={conversation.avatar || 'https://via.placeholder.com/40'} 
                  alt={conversation.name} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                {conversation.isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-surface-light dark:border-surface-dark"></span>
                )}
              </div>
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{conversation.name}</h3>
                  <span className="text-xs text-neutral-dark/70 dark:text-neutral-light/70">
                    {new Date(conversation.lastMessageTime).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-neutral-dark/70 dark:text-neutral-light/70 truncate">
                  {conversation.lastMessage}
                </p>
              </div>
              {conversation.unreadCount > 0 && (
                <span className="ml-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                  {conversation.unreadCount}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Conversations;