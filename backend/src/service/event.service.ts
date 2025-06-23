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
  /**
   * Search for events using a raw SQL WHERE clause
   * @param rawWhereQuery - SQL WHERE clause (without the 'WHERE' keyword)
   * @param params - Optional parameters to bind to the query for SQL injection protection
   * @returns Promise resolving to an array of matching events
   */
  async search(rawWhereQuery: string, params?: any[]) {
    return eventRepository.search(rawWhereQuery, params);
  },
});
