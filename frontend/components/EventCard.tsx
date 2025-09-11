import { Event } from '@/types';
import Image from 'next/image';

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const placeholderImage = 'https://via.placeholder.com/400x200.png?text=Event+Image';
  
  // Format date for better readability
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Format time to 12-hour format with AM/PM
  const formattedTime = new Date(`1970-01-01T${event.time}Z`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'UTC'
  });

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={event.image_url || placeholderImage}
          alt={event.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{event.title}</h3>
        <p className="text-gray-600 mb-4 h-20 overflow-hidden text-ellipsis">{event.description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{formattedDate}</span>
          <span>{formattedTime}</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;