import { create } from "zustand";

interface EventEditorState {
  mode: 'idle' | 'editing' | 'creating';
  eventId: string | null;
  refreshKey: number;
  startEditing: (eventId: string) => void;
  startCreating: () => void;
  reset: () => void;
  refresh: () => void;
}

const initialState: Pick<EventEditorState, 'mode' | 'eventId' | 'refreshKey'> = {
  mode: 'idle',
  eventId: null,
  refreshKey: 0,
};

export const useEventStore = create<EventEditorState>((set) => ({
  ...initialState,
  startEditing: (eventId) => set({ mode: 'editing', eventId }),
  startCreating: () => set({ mode: 'creating', eventId: null }),
  reset: () => set(initialState),
  refresh: () => set((state) => ({ refreshKey: state.refreshKey + 1 })),
}));
