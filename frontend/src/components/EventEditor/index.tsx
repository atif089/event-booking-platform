import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useEventStore } from "../../store/eventStore";
import { EVENTS_ENDPOINT } from "../../config/api";
import { useSaveEventMutation } from "../../hooks/useSaveEventMutation";

type FormValues = {
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  pricePerPerson: number;
  latitude: number;
  longitude: number;
  active: boolean;
};

const EventEditor = () => {
  const { mode, eventId, reset: storeReset } = useEventStore();
  const {
    register,
    handleSubmit,
    reset: formReset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      date: "",
      location: "",
      capacity: 0,
      pricePerPerson: 0,
      latitude: 0,
      longitude: 0,
      active: true,
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { mutate: saveEvent, isLoading: isSaving, error: saveError } = useSaveEventMutation();

  useEffect(() => {
    if (mode === "editing" && eventId) {
      setLoading(true);
      fetch(`${EVENTS_ENDPOINT}/${eventId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch event data.");
          return res.json();
        })
        .then((data) => {
          const formattedDate = data.date ? new Date(data.date).toISOString().substring(0, 16) : "";
          const { createdAt, updatedAt, ...formValues } = data; // eslint-disable-line
          formReset({ ...formValues, date: formattedDate });
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    } else {
      formReset(); // Reset to default values for 'creating' mode
    }
  }, [mode, eventId, formReset]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    saveEvent({ eventId, data });
  };

  if (loading) return <p>Loading editor...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg w-full">
      <h2 className="text-2xl font-bold mb-6">{mode === "creating" ? "Create New Event" : "Edit Event"}</h2>
      {saveError && <p className="text-red-500 mb-4">Error saving event: {saveError}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description", { required: "Description is required" })}
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="datetime-local"
            {...register("date", { required: "Date is required" })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            {...register("location", { required: "Location is required" })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
              Latitude
            </label>
            <input
              type="text"
              {...register("latitude", { valueAsNumber: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
              Longitude
            </label>
            <input
              type="text"
              {...register("longitude", { valueAsNumber: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        <div>
          <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
            Capacity
          </label>
          <input
            type="number"
            {...register("capacity", { valueAsNumber: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="pricePerPerson" className="block text-sm font-medium text-gray-700">
            Price Per Person
          </label>
          <input
            type="number"
            step="0.01"
            {...register("pricePerPerson", { valueAsNumber: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            {...register("active")}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
            Active
          </label>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={storeReset}
            disabled={isSaving}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventEditor;
