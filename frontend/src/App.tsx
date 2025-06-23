import "./App.css";
import EventList from "./components/EventList";
import { EVENTS_ENDPOINT } from "./config/api";
import { useEventStore } from "./store/eventStore";
import EventEditor from "./components/EventEditor";
import { Toaster } from "react-hot-toast";
import SearchBox from "./components/SearchBox";

function App() {
  const { mode, startCreating } = useEventStore();

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster />
      <div className="flex max-w-6xl mx-auto">
        <div className="w-1/3">
          <div className="flex justify-between items-center mb-4 p-4">
            <h1 className="text-3xl font-bold">Events</h1>
            <button
              onClick={startCreating}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create New Event
            </button>
          </div>
          <div className="p-4">
            <SearchBox />
          </div>
          <EventList title="Events List" fetchEndpoint={EVENTS_ENDPOINT} />
        </div>
        <div className="w-2/3 flex items-center justify-center">
          {mode === "idle" ? (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Welcome!</h2>
              <p className="text-lg text-gray-600">Select an event to edit or create a new one.</p>
            </div>
          ) : (
            <EventEditor />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
