import React, { createContext, useState, useContext, useEffect } from 'react';

const ChatContext = createContext();

export const useChatContext = () => useContext(ChatContext);

const deleteChat = (chatId) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    // Если удаляем активный чат, переключаемся на первый доступный
    if (activeChatId === chatId) {
        setActiveChatId(chats[0]?.id || '');
    }
};


export const ChatProvider = ({ children }) => {
    // Загрузка данных из localStorage при инициализации
    const [chats, setChats] = useState(() => {
        const savedChats = localStorage.getItem('medcontrol-chats');
        return savedChats ? JSON.parse(savedChats) : [
            { id: '1', title: 'Общий чат', messages: [] }
        ];
    });

    const [activeChatId, setActiveChatId] = useState(() => {
        return localStorage.getItem('medcontrol-activeChatId') || '1';
    });

    // Сохранение в localStorage при изменении
    useEffect(() => {
        localStorage.setItem('medcontrol-chats', JSON.stringify(chats));
        localStorage.setItem('medcontrol-activeChatId', activeChatId);
    }, [chats, activeChatId]);

    const addMessage = (chatId, message) => {
        setChats(prev => prev.map(chat =>
            chat.id === chatId
                ? { ...chat, messages: [...chat.messages, message] }
                : chat
        ));
    };

    const createNewChat = () => {
        const newChatId = Date.now().toString();
        const newChat = {
            id: newChatId,
            title: `Чат ${chats.length + 1}`,
            messages: []
        };
        setChats(prev => [...prev, newChat]);
        setActiveChatId(newChatId);
    };

    const deleteChat = (chatId) => {
        setChats(prev => prev.filter(chat => chat.id !== chatId));
        if (activeChatId === chatId) {
            setActiveChatId(chats[0]?.id || '');
        }
    };

    const clearChat = (chatId) => {
        setChats(prev => prev.map(chat =>
            chat.id === chatId ? { ...chat, messages: [] } : chat
        ));
    };

    return (
        <ChatContext.Provider value={{
            chats,
            activeChatId,
            setActiveChatId,
            addMessage,
            createNewChat,
            deleteChat,
            clearChat
        }}>
            {children}
        </ChatContext.Provider>
    );
};