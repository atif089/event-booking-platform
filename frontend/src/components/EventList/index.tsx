import { useFetchEvents } from "../../hooks/useFetchEvents";
import EventCard from "../Event";

const EventList = ({ fetchEndpoint }: { fetchEndpoint: string }) => {
  const { events, loading, error } = useFetchEvents({ endpoint: fetchEndpoint });

  if (loading) {
    return <div className="container mx-auto p-4 text-center">Loading events...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventList;
