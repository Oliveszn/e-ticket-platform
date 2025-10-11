export type FormValues = {
  title: string;
  slug: string;
  date: string;
  time: string;
  venue: {
    name: string;
    address: string;
    city: string;
    state: string;
    isPublic?: boolean; // optional because backend defaults to true
  };
  charge: "Host" | "Buyer";
  category:
    | "Music"
    | "Sports"
    | "Tech"
    | "Education"
    | "Health"
    | "Seminars"
    | "Arts & Culture";
  description?: string;
  // image: File;
  image:
    | File
    | { base64: string; name: string; type: string; size: number }
    | null;
  tickets: {
    name: string;
    price: number;
    quantity: number;
    description?: string;
    personsPerTicket?: string[];
    showVolume?: boolean; // optional because backend defaults to false
  }[];
};

///THIS IS FOR AUTH
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  businessName: string;
  address: string;
  number: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user: User;
  refreshToken: string;
  accessToken: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  user: User | null;
  error?: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface ChangePasswordFormData {
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

////THIS IS FOR EVENT SLICE
interface EventImage {
  url: string;
  publicId?: string;
  mimeType?: string;
  originalName?: string;
  optimizedUrl?: string;
}

export interface Event {
  title: string;
  slug: string;
  eventDate: string;
  eventTime: string;
  venue: {
    name: string;
    address: string;
    city: string;
    state: string;
    isPublic: boolean;
  };
  charge: "Host" | "Buyer";
  category: string;
  description?: string;
  image: EventImage;
  tickets: Ticket[];
}

export interface SingleEventResponse {
  success: boolean;
  message: string;
  data: Event;
}

export interface TrendingEventsResponse {
  success: boolean;
  message: string;
  data: Event[];
}

export interface EventsListResponse {
  success: boolean;
  message: string;
  data: Event[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface EventState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
  data: Event[] | null;
  currentEvent: Event | null;
  trendingEvents: Event[] | null;
  promoterEvents: Event[] | null;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

///THIS FOR TICKET SLICE
export interface Ticket {
  id?: number;
  name: string;
  price: number;
  quantity: number;
  sold: number;
  available?: number;
  description?: string;
  personsPerTicket?: number;
  showVolume: boolean;
}

export interface TicketResponse {
  success: string;
  message: string;
  data: Ticket[];
}

export interface SingleTicketResponse {
  success: string;
  message: string;
  data: Ticket;
}

export interface TicketState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
  data: Ticket[] | null;
  currentTicket: Ticket | null;
}

///THIS IS FOR ORDER SLICE FOR PURCHASING TICKETS
export interface PaymentState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  success: boolean;
  paymentUrl: string | null;
  reference: string | null;
  orderId: string | null;
  order: any;
}
