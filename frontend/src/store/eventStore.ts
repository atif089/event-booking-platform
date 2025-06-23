import { create } from "zustand";

interface EventEditorState {
  mode: 'idle' | 'editing' | 'creating';
  eventId: string | null;
  startEditing: (eventId: string) => void;
  startCreating: () => void;
  reset: () => void;
}

const initialState: Pick<EventEditorState, 'mode' | 'eventId'> = {
  mode: 'idle',
  eventId: null,
};

export const useEventStore = create<EventEditorState>((set) => ({
  ...initialState,
  startEditing: (eventId) => set({ mode: 'editing', eventId }),
  startCreating: () => set({ mode: 'creating', eventId: null }),
  reset: () => set(initialState),
}));
