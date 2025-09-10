# Debugging Log – Fixing `TokenData` Import Issue

## Problem Faced ❌

When testing the **`POST /events/`** endpoint, the following error occurred:

```
AttributeError: module 'app.schemas' has no attribute 'TokenData'
```

This happened inside the `get_current_user` function of `app/auth.py`.

---

## Root Cause 🔍

* The `TokenData` class was being imported from `schemas.py`.
* But `schemas.py` only contained **SQLAlchemy database models** (`User`, `Event`).
* The actual `TokenData` class was defined inside `models.py` (used for **Pydantic validation models**).

---

## Solution ✅

1. Updated **imports** in `app/auth.py`:

   ```python
   # Before ❌
   from . import database, schemas, crud

   # After ✅
   from . import database, schemas, crud, models
   ```

2. Changed the reference in `get_current_user`:

   ```python
   # Before ❌
   token_data = schemas.TokenData(email=email)

   # After ✅
   token_data = models.TokenData(email=email)
   ```

---

## Learning (Autonomy) 📖

* Always separate **database models (schemas.py)** and **Pydantic models (models.py)** clearly.
* When errors like *"no attribute found"* occur, check if the class is in the **correct module**.
* Proper naming conventions (e.g., `db_models.py`, `pydantic_models.py`) could prevent such mistakes.

---

## Commit Message 📝

Use this commit message when pushing to GitHub:

```
fix(auth): correct TokenData import from models instead of schemas
```
