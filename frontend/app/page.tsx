'use client';

import { useEffect, useState } from 'react';
import { getAllEvents } from '@/lib/api';
import { Event } from '@/types';
import EventCard from '@/components/EventCard';

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await getAllEvents();
        setEvents(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch events. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">Upcoming Events</h1>
      {loading && <p className="text-center text-gray-500">Loading events...</p>}
      {error && <p className="text-center text-red-500 bg-red-100 p-4 rounded-md">{error}</p>}
      
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.length > 0 ? (
            events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No events found.</p>
          )}
        </div>
      )}
    </div>
  );
}
