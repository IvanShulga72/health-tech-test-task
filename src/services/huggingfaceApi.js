import { OpenAI } from "openai";

export const sendMessageToAI = async (messages) => {
    try {
        const client = new OpenAI({
            baseURL: "https://router.huggingface.co/v1",
            apiKey: import.meta.env.VITE_HF_API_KEY,
            dangerouslyAllowBrowser: true
        });

        const chatCompletion = await client.chat.completions.create({
            model: "mistralai/Mistral-7B-Instruct-v0.3:together", // Используем новую версию и провайдера
            messages: messages.map(msg => ({
                role: msg.role,
                content: msg.content
            })),
            temperature: 0.7,
            max_tokens: 1000
        });

        return chatCompletion.choices[0]?.message?.content || "No response generated";
    } catch (error) {
        console.error('Hugging Face API Error:', error);
        return `Error: ${error.message}`;
    }
};