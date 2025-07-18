import React from 'react';
import { ChatProvider } from './contexts/ChatContext';
import ChatHistory from './components/ChatHistory';
import ChatWindow from './components/ChatWindow';

const App = () => {
    return (
        <ChatProvider>
            <div className="flex h-screen bg-white">
                <ChatHistory />
                <ChatWindow />
            </div>
        </ChatProvider>
    );
};

export default App;