import { useFetchEvents } from "../../hooks/useFetchEvents";
import EventCard from "../Event";

const EventList = ({ fetchEndpoint }: { fetchEndpoint: string }) => {
  if (fetchEndpoint === undefined) {
    throw new Error("EventList: fetchEndpoint prop is required");
  }

  const { events, loading, error } = useFetchEvents({ endpoint: fetchEndpoint });

  if (loading) {
    return <div className="container mx-auto p-4 text-center">Loading events...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Events List</h1>
      <div className="grid grid-cols-1 gap-4 overflow-y-scroll h-[calc(100vh-100px)] pr-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventList;
