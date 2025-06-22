import { EventRepository } from "../repository/event";

export const createEventService = (eventRepository: EventRepository) => ({
  async getAll() {
    return eventRepository.getAll();
  },
  async getById(id: string) {
    return eventRepository.getById(id);
  }
});
