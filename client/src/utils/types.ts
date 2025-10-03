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
    benefits?: string[];
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
  image: File;
  tickets: {
    name: string;
    price: number;
    quantity: number;
    description?: string;
    benefits?: string;
    showVolume: boolean;
  }[];
}

export interface EventResponse {
  success: boolean;
  message: string;
  event: Event;
}

export interface EventState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
  event: Event | null;
}
