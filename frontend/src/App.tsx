import "./App.css";
import EventList from "./components/EventList";
import { EVENTS_ENDPOINT } from "./config/api";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex max-w-6xl mx-auto">
        <div className="w-1/3">
          <EventList title="Events List" fetchEndpoint={EVENTS_ENDPOINT} />
        </div>
        <div className="w-2/3 flex items-center justify-center">
          <h2 className="text-3xl font-bold mb-4">Event Editor...</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
