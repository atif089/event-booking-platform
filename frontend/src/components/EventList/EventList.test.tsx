import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import EventList from "./index";
import { useFetchEvents } from "../../hooks/useFetchEvents";
import type { Event } from "../Event";

// Mock the useFetchEvents hook
vi.mock("../../hooks/useFetchEvents");

// Mock the EventCard component
vi.mock("../Event", () => ({
  __esModule: true,
  default: ({ event }: { event: { title: string } }) => <div>{event.title}</div>,
}));

describe("EventList", () => {
  it("throws an error when fetchEndpoint is undefined", () => {
    expect(() => render(<EventList />)).toThrowError("EventList: fetchEndpoint prop is required");
  });

  it("renders loading state correctly", () => {
    vi.mocked(useFetchEvents).mockReturnValue({ events: [], loading: true, error: null });
    render(<EventList fetchEndpoint="/api/events" />);
    expect(screen.getByText("Loading events...")).toBeInTheDocument();
  });

  it("renders error state correctly", () => {
    vi.mocked(useFetchEvents).mockReturnValue({ events: [], loading: false, error: "Failed to fetch" });
    render(<EventList fetchEndpoint="/api/events" />);
    expect(screen.getByText("Error: Failed to fetch")).toBeInTheDocument();
  });

  it("renders a list of events correctly", () => {
    const mockEvents: Event[] = [
      {
        id: 1,
        title: "Event 1",
        date: "2024-01-01",
        location: "Location 1",
        description: "Description 1",
        active: true,
      },
      {
        id: 2,
        title: "Event 2",
        date: "2024-01-02",
        location: "Location 2",
        description: "Description 2",
        active: false,
      },
    ];
    vi.mocked(useFetchEvents).mockReturnValue({ events: mockEvents, loading: false, error: null });
    render(<EventList fetchEndpoint="/api/events" title="Events List" />);
    expect(screen.getByText("Events List")).toBeInTheDocument();
    expect(screen.getByText("Event 1")).toBeInTheDocument();
    expect(screen.getByText("Event 2")).toBeInTheDocument();
  });
});
