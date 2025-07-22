import React, { useState } from 'react';
import { useChatContext } from '../contexts/ChatContext';
import { useChatApi } from '../hooks/useChatApi';

const MessageInput = () => {
    const [message, setMessage] = useState('');
    const { chats, activeChatId, addMessage } = useChatContext(); // Добавляем chats в деструктуризацию
    const { sendMessage, isLoading } = useChatApi();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim() || isLoading) return;

        // Получаем текущий чат и его сообщения
        const activeChat = chats.find(chat => chat.id === activeChatId) || { messages: [] };
        const chatMessages = activeChat.messages;

        // Формируем сообщение пользователя
        const userMessage = {
            id: Date.now(),
            content: message,
            role: 'user',
            timestamp: new Date().toISOString()
        };

        // Добавляем сообщение пользователя в чат
        addMessage(activeChatId, userMessage);
        setMessage('');

        try {
            // Подготавливаем историю для API в нужном формате
            const apiMessages = [
                ...chatMessages.map(msg => ({
                    role: msg.role,
                    content: msg.content
                })),
                { role: 'user', content: message }
            ];

            // Получаем ответ от AI
            const aiResponse = await sendMessage(apiMessages);

            if (aiResponse) {
                const aiMessage = {
                    id: Date.now() + 1,
                    content: aiResponse,
                    role: 'assistant',
                    timestamp: new Date().toISOString()
                };
                addMessage(activeChatId, aiMessage);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex">
                <textarea
                    name='textarea'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Введите сообщение..."
                    className="flex-grow p-3 border rounded focus:outline-none resize-none"
                    disabled={isLoading}
                    rows={3}
                    style={{maxHeight: '50px'}}
                />
                <button
                    type="submit"
                    disabled={!message.trim() || isLoading}
                    className={`bg-blue-500 text-white px-4 rounded-r ${
                        (!message.trim() || isLoading)
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-blue-600'
                    }`}
                >
                    {isLoading ? 'Отправка...' : 'Отправить'}
                </button>
            </div>
        </form>
    );
};

export default MessageInput;