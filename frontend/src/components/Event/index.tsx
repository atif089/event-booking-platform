import StatusChip from "../StatusChip";

export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  active: boolean;
}

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => (
  <div key={event.id} className="border rounded-lg p-4 shadow-lg bg-white">
    <div className="text-gray-600">
      <StatusChip enabled={event.active} />
    </div>
    <h2 className="text-xl font-semibold my-4">{event.title}</h2>
    <div className="flex justify-between">
      <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
      <p className="text-sm text-gray-500">{event.location}</p>
    </div>
    <p className="mt-2 " dangerouslySetInnerHTML={{ __html: event.description }}></p>
  </div>
);

export default EventCard;
