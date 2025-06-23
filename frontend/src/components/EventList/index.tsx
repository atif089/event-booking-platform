import { useFetchEvents } from "../../hooks/useFetchEvents";
import EventCard from "../Event";
import { useEventStore } from "../../store/eventStore";

const EventList = ({ fetchEndpoint, title }: { fetchEndpoint: string; title: string }) => {
  if (fetchEndpoint === undefined) {
    throw new Error("EventList: fetchEndpoint prop is required");
  }

  const { events, loading, error } = useFetchEvents({ endpoint: fetchEndpoint });
  const { startEditing, searchResults, searchQuery } = useEventStore();

  const eventsToDisplay = searchQuery ? searchResults : events;

  if (loading && !searchQuery) {
    return <div className="container mx-auto p-4 text-center">Loading events...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-center text-red-500">Error: {error}</div>;
  }

  if (searchQuery && !eventsToDisplay) {
    return <div className="container mx-auto p-4 text-center">Searching...</div>;
  }

  if (!eventsToDisplay || eventsToDisplay.length === 0) {
    return <div className="container mx-auto p-4 text-center">No events found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{searchQuery ? `Search Results for "${searchQuery}"` : title}</h1>
      <div className="grid grid-cols-1 gap-4 overflow-y-scroll h-[calc(100vh-100px)] pr-4">
        {eventsToDisplay.map((event) => (
          <EventCard key={event.id} event={event} onClick={() => startEditing(event.id.toString())} />
        ))}
      </div>
    </div>
  );
};

export default EventList;
