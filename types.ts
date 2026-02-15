
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  priceStart: number;
  expectedTime: string;
  commonProblems: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  content: string;
  rating: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

export interface BookingFormData {
  name: string;
  phone: string;
  address: string;
  service: string;
  details: string;
  isEmergency: boolean;
  preferredTime: string;
}
