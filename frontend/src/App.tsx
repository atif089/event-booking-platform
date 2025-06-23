import "./App.css";
import EventList from "./components/EventList";
import { EVENTS_ENDPOINT } from "./config/api";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <EventList fetchEndpoint={EVENTS_ENDPOINT} />
    </div>
  );
}

export default App;
