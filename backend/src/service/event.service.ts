import { EventRepository } from "../repository/event";

export const createEventService = (eventRepository: EventRepository) => ({
  async getAll() {
    return eventRepository.getAll();
  },
});
