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
  image: File;
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

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  number: string;
  address: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface ChangePasswordFormData {
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}
