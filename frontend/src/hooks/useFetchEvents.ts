import { useState, useEffect } from "react";
import type { Event } from "../components/Event";
import { useEventStore } from "../store/eventStore";

export const useFetchEvents = ({ endpoint }: { endpoint: string }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { refreshKey } = useEventStore();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(endpoint);

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
  }, [endpoint, refreshKey]);

  return { events, loading, error };
};
