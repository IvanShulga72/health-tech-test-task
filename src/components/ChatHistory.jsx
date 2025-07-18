import React from 'react';
import { useChatContext } from '../contexts/ChatContext';

const ChatHistory = () => {
    const { chats, activeChatId, setActiveChatId, createNewChat, deleteChat } = useChatContext();

    return (
        <div className="w-64 bg-gray-100 h-screen p-4 flex flex-col">
            <button
                onClick={createNewChat}
                className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                + Новый чат
            </button>

            <div className="overflow-y-auto flex-grow">
                {chats.map(chat => (
                    <div
                        key={chat.id}
                        className={`p-3 mb-2 rounded cursor-pointer flex justify-between items-center ${
                            chat.id === activeChatId
                                ? 'bg-blue-200 border-l-4 border-blue-500'
                                : 'hover:bg-gray-200'
                        }`}
                        onClick={() => setActiveChatId(chat.id)}
                    >
                        <span className="truncate flex-1">{chat.title}</span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteChat(chat.id);
                            }}
                            className="text-red-500 hover:text-red-700 ml-2"
                            aria-label="Удалить чат"
                        >
                            <svg width="30" height="30" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.6066 21.3934C22.2161 21.0029 21.5829 21.0029 21.1924 21.3934C20.8019 21.7839 20.8019 22.4171 21.1924 22.8076L22.6066 21.3934ZM40.9914 42.6066C41.3819 42.9971 42.0151 42.9971 42.4056 42.6066C42.7961 42.2161 42.7961 41.5829 42.4056 41.1924L40.9914 42.6066ZM21.1924 41.1924C20.8019 41.5829 20.8019 42.2161 21.1924 42.6066C21.5829 42.9971 22.2161 42.9971 22.6066 42.6066L21.1924 41.1924ZM42.4056 22.8076C42.7961 22.4171 42.7961 21.7839 42.4056 21.3934C42.0151 21.0029 41.3819 21.0029 40.9914 21.3934L42.4056 22.8076ZM21.1924 22.8076L40.9914 42.6066L42.4056 41.1924L22.6066 21.3934L21.1924 22.8076ZM22.6066 42.6066L42.4056 22.8076L40.9914 21.3934L21.1924 41.1924L22.6066 42.6066Z" fill="black"/>
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatHistory;