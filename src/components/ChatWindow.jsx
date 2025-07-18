import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatWindow = () => {
    return (
        <div className="flex-grow flex flex-col h-screen">
            <div className="flex-grow overflow-auto">
                <MessageList />
            </div>
            <MessageInput />
        </div>
    );
};

export default ChatWindow;