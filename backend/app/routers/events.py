from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import crud, models, auth, database, schemas

router = APIRouter(
    prefix="/events",
    tags=["events"],
)

@router.get("/", response_model=List[models.Event])
def read_events(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    events = crud.get_events(db, skip=skip, limit=limit)
    return events

@router.get("/{event_id}", response_model=models.Event)
def read_event(event_id: int, db: Session = Depends(database.get_db)):
    db_event = crud.get_event(db, event_id=event_id)
    if db_event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    return db_event

@router.post("/", response_model=models.Event, status_code=201)
def create_event(event: models.EventCreate, db: Session = Depends(database.get_db), current_user: schemas.User = Depends(auth.require_admin)):
    return crud.create_event(db=db, event=event)

@router.put("/{event_id}", response_model=models.Event)
def update_event(event_id: int, event: models.EventUpdate, db: Session = Depends(database.get_db), current_user: schemas.User = Depends(auth.require_admin)):
    db_event = crud.update_event(db, event_id, event)
    if db_event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    return db_event

@router.delete("/{event_id}", status_code=204)
def delete_event(event_id: int, db: Session = Depends(database.get_db), current_user: schemas.User = Depends(auth.require_admin)):
    db_event = crud.delete_event(db, event_id)
    if db_event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    return {"detail": "Event deleted successfully"}