import type { Route, Order, Driver, DeliveryStep } from "./types"

export const mockDriver: Driver = {
  id: "driver-1",
  name: "Jan Kowalski",
  phone: "+48 123 456 789",
  vehicleNumber: "WA 12345",
  currentLocation: [52.2297, 21.0122], // Warsaw
}

export const mockOrders: Order[] = [
  {
    id: "order-1",
    orderNumber: "NEO-2025-001",
    storeName: "NEONET Warszawa Centrum",
    address: "ul. Marszałkowska 104/122",
    city: "Warszawa",
    postalCode: "00-017",
    coordinates: [52.2297, 21.0122],
    status: "w_drodze",
    estimatedTime: "10:30",
    products: [
      {
        id: "p1",
        name: 'Samsung QLED 65" 4K Smart TV',
        type: "klienta",
        quantity: 2,
        sku: "TV-SAM-65Q",
      },
      {
        id: "p2",
        name: "LG Pralka 8kg A+++",
        type: "wystawowy",
        quantity: 1,
        sku: "AGD-LG-W8",
      },
      {
        id: "p3",
        name: "Sony PlayStation 5",
        type: "klienta",
        quantity: 3,
        sku: "CONS-PS5",
      },
    ],
  },
  {
    id: "order-2",
    orderNumber: "NEO-2025-002",
    storeName: "NEONET Kraków Galeria",
    address: "ul. Pawia 5",
    city: "Kraków",
    postalCode: "31-154",
    coordinates: [50.0647, 19.945],
    status: "oczekujące",
    estimatedTime: "14:00",
    products: [
      {
        id: "p4",
        name: "Apple iPhone 15 Pro",
        type: "wystawowy",
        quantity: 5,
        sku: "TEL-APL-15P",
      },
      {
        id: "p5",
        name: "Bosch Zmywarka 60cm",
        type: "klienta",
        quantity: 1,
        sku: "AGD-BOS-Z60",
      },
    ],
  },
  {
    id: "order-3",
    orderNumber: "NEO-2025-003",
    storeName: "NEONET Wrocław Arkady",
    address: "pl. Dominikański 3",
    city: "Wrocław",
    postalCode: "50-159",
    coordinates: [51.1079, 17.0385],
    status: "oczekujące",
    estimatedTime: "16:30",
    products: [
      {
        id: "p6",
        name: "Dell XPS 15 Laptop",
        type: "klienta",
        quantity: 2,
        sku: "COMP-DEL-XPS15",
      },
    ],
  },
]

export const mockRoute: Route = {
  id: "route-1",
  name: "Trasa Warszawa - Południe",
  driver: mockDriver,
  orders: mockOrders,
  status: "active",
  totalStops: 3,
  completedStops: 0,
  estimatedCompletion: "17:00",
}

export const deliverySteps: DeliveryStep[] = [
  {
    id: "step-1",
    label: "Start z magazynu",
    status: "completed",
    timestamp: "08:00",
    confirmedBy: "Jan Kowalski",
  },
  {
    id: "step-2",
    label: "Przyjazd do sklepu",
    status: "in-progress",
  },
  {
    id: "step-3",
    label: "Rozpoczęcie rozładunku",
    status: "pending",
  },
  {
    id: "step-4",
    label: "Zakończenie rozładunku",
    status: "pending",
  },
  {
    id: "step-5",
    label: "Wyjazd ze sklepu",
    status: "pending",
  },
]

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    oczekujące: "Oczekujące",
    w_drodze: "W drodze",
    przy_sklepie: "Przy sklepie",
    rozładunek: "Rozładunek",
    zakończone: "Zakończone",
  }
  return labels[status] || status
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    oczekujące: "bg-muted text-muted-foreground",
    w_drodze: "bg-primary/10 text-primary",
    przy_sklepie: "bg-chart-4 text-foreground",
    rozładunek: "bg-chart-4 text-foreground",
    zakończone: "bg-chart-2 text-card",
  }
  return colors[status] || "bg-muted text-muted-foreground"
}
