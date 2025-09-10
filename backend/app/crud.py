from sqlalchemy.orm import Session
from . import models, schemas, auth

# User CRUD
def get_user_by_email(db: Session, email: str):
    return db.query(schemas.User).filter(schemas.User.email == email).first()

def create_user(db: Session, user: models.UserCreate):
    hashed_password = auth.get_password_hash(user.password)
    db_user = schemas.User(
        email=user.email,
        name=user.name,
        hashed_password=hashed_password,
        role=user.role
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Event CRUD
def get_events(db: Session, skip: int = 0, limit: int = 100):
    return db.query(schemas.Event).offset(skip).limit(limit).all()

def get_event(db: Session, event_id: int):
    return db.query(schemas.Event).filter(schemas.Event.id == event_id).first()

def create_event(db: Session, event: models.EventCreate):
    db_event = schemas.Event(**event.dict())
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

def update_event(db: Session, event_id: int, event: models.EventUpdate):
    db_event = get_event(db=db, event_id=event_id)
    if db_event:
        for key, value in event.dict().items():
            setattr(db_event, key, value)
        db.commit()
        db.refresh(db_event)
    return db_event

def delete_event(db: Session, event_id: int):
    db_event = get_event(db=db, event_id=event_id)
    if db_event:
        db.delete(db_event)
        db.commit()
    return db_event