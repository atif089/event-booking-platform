export interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  location: string;
  capacity?: number;
  pricePerPerson?: number;
  latitude?: number;
  longitude?: number;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
