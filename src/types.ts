export interface Category {
  name: string;
  slug: string;
  color?: string;
  icon?: string;
}

export interface Organizer {
  name: string;
  avatar?: string;
  email?: string;
}

export interface EventItem {
  _id: string;
  _creationTime?: number;
  title: string;
  description: string;
  coverImage?: string;
  categoryId: string;
  organizerId: string;
  startTime: number;
  endTime: number;
  location: string;
  isVirtual: boolean;
  capacity?: number;
  price?: number;
  status: string;
  createdAt: number;
  category?: Category | null;
  organizer?: Organizer | null;
}
