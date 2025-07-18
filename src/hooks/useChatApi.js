import { useState } from 'react';
import { sendMessageToAI } from '../services/huggingfaceApi';

export const useChatApi = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendMessage = async (messages) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await sendMessageToAI(messages);
            return response;
        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return { sendMessage, isLoading, error };
};