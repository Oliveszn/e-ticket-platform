export interface RegistrationInput {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  number: string;
  password: string;
}

////ticket and eventiput are both for when a promoter is cretaing an event
export interface Ticket {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  sold: number;
  description: string;
  personsPerTicket: number;
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

///deals with emails
export interface EmailData {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

export interface PromoterData {
  email: string;
  firstName: string;
}

export interface TicketData {
  ticketNumber: string;
  recipientEmail: string;
  recipientFirstName: string;
  recipientLastName: string;
  ticketTypeName: string;
  eventTitle: string;
  eventDate: string;
  eventVenue: string;
  qrCode?: string;
}

export interface OrderData {
  customerEmail: string;
  orderNumber: string;
  eventTitle: string;
  tickets: TicketData[];
  totalAmount: number;
  eventDate: string;
  eventVenue: string;
}
