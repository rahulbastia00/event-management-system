import { Event } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Utility to get the token from localStorage
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token");
  }
  return null;
};

// --- AUTH ---
export const signupUser = async (userData: Record<string, string>) => {
  const response = await fetch(`${API_BASE_URL}/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Signup failed");
  }
  return response.json();
};

export const loginUser = async (credentials: Record<string, string>) => {
  const params = new URLSearchParams();
  params.append("username", credentials.email);
  params.append("password", credentials.password);

  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Login failed");
  }
  return response.json();
};


// --- EVENTS ---
export const getAllEvents = async (): Promise<Event[]> => {
  const response = await fetch(`${API_BASE_URL}/events/`);
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  return response.json();
};

export const createEvent = async (eventData: Omit<Event, 'id' | 'owner_id'>): Promise<Event> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/events/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to create event");
  }
  return response.json();
};

export const updateEvent = async (eventId: number, eventData: Partial<Omit<Event, 'id' | 'owner_id'>>): Promise<Event> => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to update event');
    }
    return response.json();
};


export const deleteEvent = async (eventId: number): Promise<{ message: string }> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to delete event");
  }
  return response.json();
};
