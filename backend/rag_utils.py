from sentence_transformers import SentenceTransformer
import faiss
import os

model = SentenceTransformer('all-MiniLM-L6-v2')
index = faiss.IndexFlatL2(384)  # 384 = embedding dim for the model
documents = []

def embed_and_store(text):
    global documents
    chunks = chunk_text(text)
    embeddings = model.encode(chunks)
    index.add(embeddings)
    documents.extend(chunks)

def chunk_text(text, max_length=500):
    words = text.split()
    chunks = []
    for i in range(0, len(words), max_length):
        chunk = " ".join(words[i:i+max_length])
        chunks.append(chunk)
    return chunks 
def get_all_chunks():
    return documents

