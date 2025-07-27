from fastapi import FastAPI, UploadFile, File, Request
from pdf_parser import parse_pdf
from rag_utils import embed_and_store, documents, model, index
from question_answering_gemini import get_answer_with_gemini
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # 👈 specify your frontend's origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.post("/upload_pdf/")
async def upload(file: UploadFile = File(...)):
    print("Received file")
    text = await parse_pdf(file)
    print("Parsed PDF")
    embed_and_store(text)
    print("Embedded and stored")
    return {"message": "PDF uploaded and processed successfully"}
@app.get("/chunks/")
def get_chunks():
    from rag_utils import get_all_chunks
    return {"chunks": get_all_chunks()}
from rag_utils import documents, model, index
from question_answering_gemini import get_answer_with_gemini
import numpy as np
from pydantic import BaseModel

class QuestionInput(BaseModel):
    question: str

@app.post("/ask_question/")
def ask_question(data: QuestionInput):
    question = data.question
    if not question:
        return {"error": "Question cannot be empty"}    
    # Step 1: Embed question
    q_emb = model.encode([question])
    D, I = index.search(np.array(q_emb), 3)

    # Step 2: Retrieve top chunks
    top_chunks = [documents[i] for i in I[0]]

    # Step 3: Ask Gemini
    answer, refs = get_answer_with_gemini(question, top_chunks)

    return {
        "answer": answer,
        "references": refs
    }
