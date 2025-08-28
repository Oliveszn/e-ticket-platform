export interface RegistrationInput {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  number: string;
  password: string;
}

export interface Ticket {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  sold: number;
  description: string;
  benefits: string[];
  showVolume: boolean;
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
    isPublic: boolean;
  };
  charge: string;
  category: string;
  description: string;
  image: string;
  ticket: Ticket[];
}

//this is the field for when a user wants to purchase tickets
export interface TicketInfo {
  firstName: string;
  lastName: string;
  email: string;
  numberOfTickets: number;
  info?: any;
  recipients?: any;
  sendToMultipleRecipients?: boolean;
}
