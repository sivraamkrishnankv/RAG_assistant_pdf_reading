import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load .env from root directory
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

# Get environment variables
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")  # use latest supported model

# Configure Gemini API
genai.configure(api_key=GEMINI_API_KEY, transport="rest")
model = genai.GenerativeModel(GEMINI_MODEL)


def get_answer_with_gemini(question, top_chunks):
    """
    Generate an answer using Gemini model based on the retrieved chunks.

    Args:
        question (str): User question
        top_chunks (list[str]): Retrieved text chunks from FAISS

    Returns:
        answer (str), references (list[str])
    """
    # 🧠 Prompt building
    context = "\n\n".join(top_chunks)
    prompt = f"""
You are a helpful research assistant.

Use the below extracted context to answer the question accurately and clearly.
Cite the parts you used at the end of your answer as bullet points.

Context:
\"\"\"
{context}
\"\"\"

Question: {question}
Answer:
"""

    # 🤖 Call Gemini model
    try:
        response = model.generate_content(prompt)
        answer = response.text
    except Exception as e:
        print(f"[Gemini Error] {e}")
        answer = "⚠️ Gemini API failed to generate an answer."

    return answer, top_chunks  # return top_chunks as references
