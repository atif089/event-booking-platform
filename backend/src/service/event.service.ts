import { CreateEventData, UpdateEventData, EventRepository } from "../repository/event";

export const createEventService = (eventRepository: EventRepository) => ({
  async getAll() {
    return eventRepository.getAll();
  },
  async getById(id: string) {
    return eventRepository.getById(id);
  },
  async create(data: CreateEventData) {
    return eventRepository.create(data);
  },
  async update(id: string, data: UpdateEventData) {
    return eventRepository.update(id, data);
  },
  async delete(id: string) {
    return eventRepository.delete(id);
  },
});
