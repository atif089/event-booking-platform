import { create } from "zustand";
import { Event } from "../types";

import { EVENTS_ENDPOINT } from "../config/api";

interface EventEditorState {
  mode: "idle" | "editing" | "creating";
  eventId: string | null;
  refreshKey: number;
  searchResults: Event[] | null;
  searchQuery: string;
  startEditing: (eventId: string) => void;
  startCreating: () => void;
  reset: () => void;
  refresh: () => void;
  searchEvents: (query: string) => Promise<void>;
}

const initialState: Pick<EventEditorState, "mode" | "eventId" | "refreshKey" | "searchResults" | "searchQuery"> = {
  mode: "idle",
  eventId: null,
  refreshKey: 0,
  searchResults: null,
  searchQuery: "",
};

export const useEventStore = create<EventEditorState>((set) => ({
  ...initialState,
  startEditing: (eventId) => set({ mode: "editing", eventId }),
  startCreating: () => set({ mode: "creating", eventId: null }),
  reset: () => set(initialState),
  refresh: () => set((state) => ({ refreshKey: state.refreshKey + 1 })),
  searchEvents: async (query) => {
    try {
      const response = await fetch(`${EVENTS_ENDPOINT}/search?q=${query}`);
      const events = await response.json();
      set({ searchResults: events, searchQuery: query });
    } catch (error) {
      console.error("Failed to search events:", error);
    }
  },
}));
