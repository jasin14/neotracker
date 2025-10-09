"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Package, ChevronRight } from "lucide-react"
import type { Route, Order } from "@/lib/types"
import { getStatusLabel, getStatusColor } from "@/lib/mock-data"
import { RouteMap } from "./route-map"

interface DeliveriesListProps {
  route: Route
  onOrderSelect: (order: Order) => void
}

export function DeliveriesList({ route, onOrderSelect }: DeliveriesListProps) {
  return (
    <div className="space-y-6">
      {/* Route Overview */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">{route.name}</h2>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Package className="h-4 w-4" />
            <span>
              {route.completedStops} / {route.totalStops} dostaw
            </span>
          </div>
          {route.estimatedCompletion && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Szacowany koniec: {route.estimatedCompletion}</span>
            </div>
          )}
        </div>
      </div>

      {/* Map Preview */}
      <Card className="overflow-hidden">
        <div className="h-[300px] w-full">
          <RouteMap orders={route.orders} driverLocation={route.driver.currentLocation} />
        </div>
      </Card>

      {/* Deliveries List */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-foreground">Lista dostaw</h3>
        <div className="space-y-3">
          {route.orders.map((order) => (
            <Card
              key={order.id}
              className="cursor-pointer transition-all hover:shadow-md"
              onClick={() => onOrderSelect(order)}
            >
              <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-medium text-foreground">{order.storeName}</h4>
                        <p className="text-sm text-muted-foreground">{order.orderNumber}</p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>{getStatusLabel(order.status)}</Badge>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {order.address}, {order.city}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Package className="h-4 w-4" />
                        <span>{order.products.length} produktów</span>
                      </div>
                      {order.estimatedTime && (
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Szacowany czas: {order.estimatedTime}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button variant="ghost" size="icon" className="shrink-0">
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Driver Info */}
      <Card>
        <div className="p-4">
          <h3 className="mb-3 text-lg font-medium text-foreground">Kierowca</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Imię i nazwisko:</span>
              <span className="font-medium text-foreground">{route.driver.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Telefon:</span>
              <span className="font-medium text-foreground">{route.driver.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pojazd:</span>
              <span className="font-medium text-foreground">{route.driver.vehicleNumber}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
