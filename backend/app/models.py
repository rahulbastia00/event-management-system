from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# User Models
class UserBase(BaseModel):
    name: str
    email: EmailStr
    role: str = "normal"

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        orm_mode = True

# Token Models
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# Event Models
class EventBase(BaseModel):
    title: str
    description: Optional[str] = None
    date: str
    time: str
    image_url: Optional[str] = None

class EventCreate(EventBase):
    pass

class EventUpdate(EventBase):
    pass

class Event(EventBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True