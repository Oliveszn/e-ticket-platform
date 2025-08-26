export interface RegistrationInput {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  number: string;
  password: string;
}

export interface EventInput {
  title: string;
  slug: string;
  eventDate: string;
  eventTime: string;
  venue: {
    name: string;
    address: string;
    city: string;
    state: string;
    isPublic: Boolean;
  };
  charge: string;
  category: string;
  description: string;
  image: string;
  ticket: {
    name: string;
    price: number;
    quantity: number;
    sold: number;
    description: string;
    benefits: string[];
    showVolume: boolean;
  }[];
}
