const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY; // Добавьте ключ в .env

export const sendMessageToAI = async (messages) => {
    try {
        const response = await fetch(DEEPSEEK_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages,
                temperature: 0.7,
                max_tokens: 2000
            })
        });

        if (!response.ok) throw new Error('API request failed');

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('API Error:', error);
        return 'Произошла ошибка при обработке запроса';
    }
};