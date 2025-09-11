'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { getAllEvents, createEvent, updateEvent, deleteEvent } from '@/lib/api';
import { Event } from '@/types';

type EventFormData = {
  title: string;
  description: string;
  date: string;
  time: string;
  image_url: string;
};

export default function AdminPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    date: '',
    time: '',
    image_url: '',
  });

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await getAllEvents();
      setEvents(data);
    } catch (_err) { // Changed to _err to mark as unused
      setError('Failed to fetch events.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/login');
    } else {
      fetchEvents();
    }
  }, [router]);

  const openModal = (event: Event | null = null) => {
    setCurrentEvent(event);
    if (event) {
        const formattedDate = new Date(event.date).toISOString().split('T')[0];
        const formattedTime = event.time;
        setFormData({
            title: event.title,
            description: event.description,
            date: formattedDate,
            time: formattedTime,
            image_url: event.image_url || '',
        });
    } else {
      setFormData({ title: '', description: '', date: '', time: '', image_url: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEvent(null);
    setError(null);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
        const eventPayload = { ...formData, time: `${formData.time}:00` };
        if (currentEvent) {
            await updateEvent(currentEvent.id, eventPayload);
        } else {
            await createEvent(eventPayload);
        }
        closeModal();
        fetchEvents();
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An error occurred.');
        }
    }
  };

  const handleDelete = async (eventId: number) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(eventId);
        fetchEvents();
      } catch (_err) { // Changed to _err to mark as unused
        alert('Failed to delete event.');
      }
    }
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => openModal()}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Add New Event
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.map((event) => (
              <tr key={event.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.time}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => openModal(event)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                  <button onClick={() => handleDelete(event.id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg z-50">
            <h2 className="text-2xl font-bold mb-6">{currentEvent ? 'Edit Event' : 'Add New Event'}</h2>
            {error && <p className="text-red-500 bg-red-100 p-2 rounded-md mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input type="text" name="title" id="title" value={formData.title} onChange={handleInputChange} required className="w-full px-3 py-2 mt-1 border rounded-md"/>
              </div>
               <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea name="description" id="description" value={formData.description} onChange={handleInputChange} required rows={3} className="w-full px-3 py-2 mt-1 border rounded-md"/>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                    <input type="date" name="date" id="date" value={formData.date} onChange={handleInputChange} required className="w-full px-3 py-2 mt-1 border rounded-md"/>
                </div>
                 <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                    <input type="time" name="time" id="time" value={formData.time} onChange={handleInputChange} required className="w-full px-3 py-2 mt-1 border rounded-md"/>
                </div>
              </div>
              <div>
                <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">Image URL</label>
                <input type="text" name="image_url" id="image_url" value={formData.image_url} onChange={handleInputChange} className="w-full px-3 py-2 mt-1 border rounded-md"/>
              </div>
              <div className="flex justify-end pt-4 space-x-2">
                <button type="button" onClick={closeModal} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">Cancel</button>
                <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
