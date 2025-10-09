export type ProductType = "klienta" | "wystawowy"

export interface Product {
  id: string
  name: string
  type: ProductType
  quantity: number
  sku?: string
}

export interface Order {
  id: string
  orderNumber: string
  storeName: string
  address: string
  city: string
  postalCode: string
  coordinates: [number, number]
  products: Product[]
  status: DeliveryStatus
  estimatedTime?: string
  notes?: string
}

export type DeliveryStatus = "oczekujące" | "w_drodze" | "przy_sklepie" | "rozładunek" | "zakończone"

export interface DeliveryStep {
  id: string
  label: string
  status: "pending" | "in-progress" | "completed"
  timestamp?: string
  confirmedBy?: string
}

export interface Driver {
  id: string
  name: string
  phone: string
  vehicleNumber: string
  currentLocation: [number, number]
}

export interface Route {
  id: string
  name: string
  driver: Driver
  orders: Order[]
  status: "active" | "completed"
  totalStops: number
  completedStops: number
  estimatedCompletion?: string
}
