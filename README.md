# Event Management System - Full Stack Project

This is a full-stack event management application built as part of the Hirekarma Pvt Ltd assignment. It features a separate backend API and a frontend client, allowing admin users to manage events and normal users to view them.

---

## Table of Contents

* [Tech Stack](#tech-stack)
* [Features](#features)
* [Project Structure](#project-structure)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Backend Setup](#backend-setup)
  * [Frontend Setup](#frontend-setup)
* [API Endpoints](#api-endpoints)
* [Deployment](#deployment)


---

## Tech Stack

* **Backend**: Python, FastAPI
* **Frontend**: Next.js, React, Tailwind CSS
* **Database**: PostgreSQL
* **Authentication**: JWT (JSON Web Tokens)
* **Version Control**: Git & GitHub

---

## Features

* **User Authentication**: Secure Signup and Login for both admin and normal users.
* **Role-Based Access Control**:

  * **Admin**: Full CRUD (Create, Read, Update, Delete) access to events.
  * **Normal User**: View-only access to the event list and details.
* **Event Management**: Admins can add, update, and delete events, including details like title, description, date, time, and an image URL.
* **Responsive UI**: A clean, modern, and fully responsive user interface built with Tailwind CSS.

---

## Project Structure

```
event-management-system/
├── backend/                  # FastAPI Application
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── database.py
│   │   ├── crud.py
│   │   ├── schemas.py
│   │   ├── auth.py
│   │   └── routers/
│   │       ├── events.py
│   │       └── users.py
│   ├── requirements.txt
│   └── .env.example
├── frontend/                 # Next.js Application (coming soon)
└── README.md
```

---

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

* Python 3.8+
* Node.js & npm (or yarn)
* PostgreSQL database
* Git

### Backend Setup

1. Clone the repository:

   ```bash
   git clone <your-repository-url>
   cd event-management-system/backend
   ```

2. Create and activate a virtual environment:

   ```bash
   # For macOS/Linux
   python3 -m venv venv
   source venv/bin/activate

   # For Windows
   python -m venv venv
   venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Open the `.env` file and update the `DATABASE_URL` with your PostgreSQL connection string and set a `SECRET_KEY`.

5. Run the FastAPI server:

   ```bash
   uvicorn app.main:app --reload
   ```

   The API will be running at [http://127.0.0.1:8000](http://127.0.0.1:8000). You can access the interactive documentation at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

### Frontend Setup

(Instructions to be added once the frontend is developed.)

---

## API Endpoints

A brief overview of the available API endpoints. For detailed information, refer to the `/docs` route.

* **POST** `/users/signup` - Register a new user.
* **POST** `/users/login` - Authenticate and receive a JWT token.
* **GET** `/events/` - Fetch all events (public).
* **POST** `/events/` - Create a new event (admin only).
* **PUT** `/events/{event_id}` - Update an existing event (admin only).
* **DELETE** `/events/{event_id}` - Delete an event (admin only).

---

## Deployment

* **Backend**: Deployed on \[Render/Railway/Heroku]. Live URL: *\[https://event-management-system-cn0v.onrender.com]/*
* **Frontend**: Deployed on \[Vercel/Netlify]. Live URL: *\[https://event-management-system-gray-phi.vercel.app/]*

---

