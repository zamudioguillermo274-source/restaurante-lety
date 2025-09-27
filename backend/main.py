from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Restaurante Lety API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Restaurante Lety API funcionando"}

@app.get("/api/menu")
async def get_menu():
    return {
        "menu": [
            {"name": "Tacos", "price": 15.0, "description": "Deliciosos tacos caseros"},
            {"name": "Quesadillas", "price": 20.0, "description": "Con queso derretido"},
            {"name": "Tortas", "price": 25.0, "description": "Pan crujiente con ingredientes frescos"}
        ]
    }
