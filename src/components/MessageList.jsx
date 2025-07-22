import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useChatContext } from '../contexts/ChatContext';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

const MessageList = () => {
    const { chats, activeChatId } = useChatContext();
    const activeChat = chats.find(chat => chat.id === activeChatId) || { messages: [] };

    return (
        <div className="flex-grow overflow-y-auto p-4">
            {activeChat.messages.map(msg => (
                <div
                    key={msg.id}
                    className={`mb-4 p-4 rounded-lg ${
                        msg.role === 'user'
                            ? 'bg-blue-100 self-end ml-10'
                            : 'bg-gray-100 self-start mr-10'
                    }`}
                >
                    <div className="font-semibold mb-1">
                        {msg.role === 'user' ? 'Вы' : 'Ассистент'}
                    </div>
                    <div className="prose max-w-none">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]} // Поддержка GitHub Flavored Markdown
                            rehypePlugins={[rehypeHighlight]} // Подсветка синтаксиса
                            components={{
                                // Кастомные стили для элементов Markdown
                                h1: ({node, ...props}) => <h1 className="text-2xl font-bold my-2" {...props} />,
                                h2: ({node, ...props}) => <h2 className="text-xl font-bold my-2" {...props} />,
                                p: ({node, ...props}) => <div className="mb-3" {...props} />,
                                ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-3" {...props} />,
                                ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-3" {...props} />,
                                code: ({node, inline, className, ...props}) =>
                                    inline
                                        ? <code className="bg-gray-200 px-1 rounded" {...props} />
                                        : <pre className="bg-gray-800 text-white p-3 rounded mb-3 overflow-x-auto">
                        <code className={className} {...props} />
                      </pre>,
                                a: ({node, ...props}) => <a className="text-blue-600 hover:underline" {...props} />
                            }}
                        >
                            {msg.content}
                        </ReactMarkdown>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MessageList;