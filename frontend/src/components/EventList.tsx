import { useState, useEffect } from "react";

// Define the Event interface here
export interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  description: string;
}

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log("Fetching events...");
        const response = await fetch("http://localhost:3081/events");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

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
          <div key={event.id} className="border rounded-lg p-4 shadow-lg bg-white">
            <h2 className="text-2xl font-semibold">{event.name}</h2>
            <p className="text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
            <p className="text-gray-500">{event.location}</p>
            <p className="mt-2">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
