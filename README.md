# Chat Application

![React](https://img.shields.io/badge/React-19.1.0-blue)
![Vite](https://img.shields.io/badge/Vite-7.0.5-orange)
![HuggingFace](https://img.shields.io/badge/LLM-HuggingFace-yellow)

Чат-приложение с поддержкой AI, разработанное в рамках тестового задания для компании "Технология Здоровья".

## 🚀 Особенности

- **Интерфейс в стиле ChatGPT** с историей сообщений
- **Несколько параллельных чатов** с возможностью переключения
- **Поддержка Markdown** в сообщениях:
    - Заголовки, списки, цитаты
    - Подсветка синтаксиса для кода
    - Ссылки и форматирование текста
- **Локальное сохранение** истории чатов (localStorage)
- **Интеграция с Hugging Face API** для AI-ответов
- **Адаптивный дизайн** с чистым UI

## 📦 Для установки и дальнейшей разработки

  
1. Выполнить команды:
   ```bash
   git clone https://github.com/IvanShulga72/health-tech-test-task
   cd medcontrol-chat
   
2. Создать файл .env и записать туда строку

     VITE_HF_API_KEY=your-key 

     получить по его https://huggingface.co/


3. Выполнить команды 
    ```bash
   npm run dev
