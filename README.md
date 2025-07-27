# RAG Assistant – Resume-Based AI Question Answering System
Project Description
RAG Assistant is a full-stack AI-powered system that allows users to upload their resume as a PDF and ask natural language questions. It uses Retrieval-Augmented Generation (RAG) with Google Gemini and FAISS vector search to provide accurate answers along with references from the uploaded content.

## 💻 Features


Upload resume PDF and extract text


Generate embeddings and store in FAISS


Ask natural questions and get LLM-generated answers


Provides source references


Beautiful dark-themed UI using Tailwind CSS


Full-stack implementation using FastAPI, Next.js, and Gemini



## 📂 Folder Structure
```
RAG_assistant_pdf_reading-main/
│
├── backend/
│   ├── main.py
│   ├── rag_utils.py
│   ├── pdf_parser.py
│   ├── question_answering_gemini.py
│   └── .env
│
├── frontend/
│   ├── app/
│   │   └── page.tsx
│   ├── components/
│   │   └── AskQuestions.tsx
│   ├── pages/
│   │   └── index.tsx
│   ├── styles/
│   │   └── globals.css
│   ├── public/
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── tsconfig.json
│
├── .gitignore
└── README.md
```

## 🚀 Backend Setup Instructions
### 1. Create and Activate Virtual Environment
python -m venv venv
# Windows
.\venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

### 2. Install Backend Dependencies
pip install -r requirements.txt

If you don’t have a requirements.txt yet, use this:
fastapi
uvicorn
PyMuPDF
faiss-cpu
numpy
openai
python-dotenv


### 3. Create .env File
Inside backend/ folder:
GEMINI_API_KEY=your_google_gemini_api_key_here

### 4. Run Backend Server
uvicorn main:app --reload --port 8002

### 5. Test API
Open Swagger docs:
[http://127.0.0.1:8002/docs](http://127.0.0.1:8002/docs)

## 🌐 Frontend Setup Instructions

### 1. Navigate to Frontend Folder
cd frontend

### 2. Install Node Modules
npm install

### 3. Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

### 4. Configure Tailwind
Edit tailwind.config.js:
```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
```
### 5. Setup Global CSS
In styles/globals.css:
```@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  background-color: #111827;
  color: white;
}
```
### 6. Start Frontend Dev Server
npm run dev

Open your browser at:
[http://localhost:3000](http://localhost:3000/)

## 🧠 How it Works


Upload PDF ➝ Parsed and split into chunks


Chunks are embedded with Gemini Embedding API


Embeddings are stored in FAISS index


User asks question ➝ it's embedded and matched to top chunks


Top chunks passed to Gemini LLM for final answer


Response is returned with references





## 📚 Sample Questions You Can Ask


"What are my technical skills?"


"What are my strengths?"


"Do I have any experience with Docker?"


"List my published papers"



## 👨‍💻 Author
Siv Raam Krishnan K V
[LinkedIn](https://www.linkedin.com/in/sivraamkrishnankv)
[GitHub](https://github.com/sivraamkrishannkv)
