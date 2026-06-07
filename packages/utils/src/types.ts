// ─── Booking Types ──────────────────────────────────────────────────────────

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "driver_assigned"
  | "en_route"
  | "arrived"
  | "in_progress"
  | "completed"
  | "cancelled";

export type VehicleCategory =
  | "sedan"
  | "suv"
  | "luxury"
  | "van"
  | "stretch_limo";

export type BookingType =
  | "airport_transfer"
  | "corporate"
  | "wedding"
  | "hourly"
  | "special_event";

export interface Location {
  address: string;
  lat: number;
  lng: number;
  placeId?: string;
}

export interface BookingStop {
  location: Location;
  type: "pickup" | "waypoint" | "dropoff";
  order: number;
}

export interface PricingConfig {
  vehicleCategory: VehicleCategory;
  baseRatePerKm: number;       // AUD per km
  minimumFare: number;          // AUD
  airportSurcharge: number;     // AUD flat fee
  afterHoursSurcharge: number;  // multiplier e.g. 1.25
  weddingFlatRate?: number;     // AUD optional
  bookingFee: number;           // AUD flat booking fee
}

export interface PricingBreakdown {
  distanceKm: number;
  durationMinutes: number;
  baseCharge: number;
  bookingFee: number;
  airportSurcharge: number;
  afterHoursSurcharge: number;
  gst: number;
  total: number;
  currency: "AUD";
}

export interface Booking {
  id: string;
  customerId: string;
  driverId?: string;
  vehicleId?: string;
  type: BookingType;
  status: BookingStatus;
  stops: BookingStop[];
  vehicleCategory: VehicleCategory;
  pricing: PricingBreakdown;
  scheduledAt: string;
  passengers: number;
  luggage: number;
  specialRequests?: string;
  flightNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Driver {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  licenseNumber: string;
  profilePhoto?: string;
  rating: number;
  totalTrips: number;
  status: "available" | "on_trip" | "offline";
  vehicleId?: string;
  isApproved: boolean;
  currentLocation?: { lat: number; lng: number };
}

export interface Vehicle {
  id: string;
  driverId: string;
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  category: VehicleCategory;
  capacity: number;
  photo?: string;
  isActive: boolean;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  totalBookings: number;
  createdAt: string;
}

// ─── Admin Types ─────────────────────────────────────────────────────────────

export interface DashboardStats {
  totalBookings: number;
  activeTrips: number;
  totalRevenue: number;
  totalDrivers: number;
  completionRate: number;
  avgRating: number;
}

export interface RevenueData {
  date: string;
  revenue: number;
  bookings: number;
}
