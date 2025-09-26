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
  ticket: {
    name: string;
    price: number;
    quantity: number;
    description?: string;
    benefits?: string[];
    showVolume?: boolean; // optional because backend defaults to false
  }[];
};
