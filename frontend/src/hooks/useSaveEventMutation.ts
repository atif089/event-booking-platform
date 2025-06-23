import { useState } from "react";
import { EVENTS_ENDPOINT } from "../config/api";
import toast from "react-hot-toast";
import { useEventStore } from "../store/eventStore";

// This type should match the FormValues in EventEditor
interface EventData {
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  pricePerPerson: number;
  latitude: number;
  longitude: number;
  active: boolean;
}

interface MutationParams {
  eventId?: string | null;
  data: EventData;
}

export const useSaveEventMutation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { refresh } = useEventStore();
  const mutate = async ({ eventId, data }: MutationParams) => {
    setIsLoading(true);
    setError(null);

    const url = eventId ? `${EVENTS_ENDPOINT}/${eventId}` : EVENTS_ENDPOINT;
    const method = eventId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to save event.`);
      }

      toast.success("Event saved successfully!");
      refresh();
    } catch (err: unknown) {
      let message = "Failed to save event.";
      if (err instanceof Error) {
        message = err.message;
      }
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
};
