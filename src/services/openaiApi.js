import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY, // Добавьте в .env
    dangerouslyAllowBrowser: true // Только для фронтенда (в идеале API calls делать через бекенд)
});

export const sendMessageToAI = async (messages) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages,
            max_tokens: 1000
        });
        return response.choices[0].message.content;
    } catch (error) {
        console.error('OpenAI Error:', error);
        return "Ошибка при запросе к OpenAI";
    }
};