import React, { useState } from "react";
import { useEventStore } from "../store/eventStore";

const SearchBox: React.FC = () => {
  const [query, setQuery] = useState("");
  const searchEvents = useEventStore((state) => state.searchEvents);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchEvents(query);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for events..."
        className="border rounded-l py-2 px-4 w-full"
      />
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r">
        Search
      </button>
    </form>
  );
};

export default SearchBox;
