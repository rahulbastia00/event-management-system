from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import schemas
from .database import engine
from .routers import events, users

# This command creates the database tables
schemas.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS Middleware
# This allows the frontend to communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(events.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Event Management System API"}