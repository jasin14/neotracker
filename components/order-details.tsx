"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, MapPin, Package, Phone, ClipboardList, ChevronDown, ChevronUp } from "lucide-react"
import type { Order, Driver } from "@/lib/types"
import { getStatusLabel, getStatusColor } from "@/lib/mock-data"
import { RouteMap } from "./route-map"
import { useState } from "react"

interface OrderDetailsProps {
  order: Order
  driver: Driver
  onBack: () => void
  onShowChecklist: () => void
}

export function OrderDetails({ order, driver, onBack, onShowChecklist }: OrderDetailsProps) {
  const [expandedProducts, setExpandedProducts] = useState(true)

  const customerProducts = order.products.filter((p) => p.type === "klienta")
  const displayProducts = order.products.filter((p) => p.type === "wystawowy")

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Powrót do listy
      </Button>

      {/* Order Header */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">{order.storeName}</h2>
            <p className="text-sm text-muted-foreground">{order.orderNumber}</p>
          </div>
          <Badge className={getStatusColor(order.status)}>{getStatusLabel(order.status)}</Badge>
        </div>
      </div>

      {/* Map */}
      <Card className="overflow-hidden">
        <div className="h-[400px] w-full">
          <RouteMap orders={[order]} driverLocation={driver.currentLocation} selectedOrder={order} />
        </div>
      </Card>

      {/* Order Information */}
      <Card>
        <div className="p-4 space-y-4">
          <h3 className="text-lg font-medium text-foreground">Informacje o zamówieniu</h3>

          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Adres dostawy</p>
                <p className="text-sm text-muted-foreground">
                  {order.address}
                  <br />
                  {order.postalCode} {order.city}
                </p>
              </div>
            </div>

            {order.estimatedTime && (
              <div className="flex items-start gap-2">
                <Package className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">Szacowany czas dostawy</p>
                  <p className="text-sm text-muted-foreground">{order.estimatedTime}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Products */}
      <Card>
        <div className="p-4 space-y-4">
          <button
            onClick={() => setExpandedProducts(!expandedProducts)}
            className="flex w-full items-center justify-between text-left"
          >
            <h3 className="text-lg font-medium text-foreground">Produkty ({order.products.length})</h3>
            {expandedProducts ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </button>

          {expandedProducts && (
            <div className="space-y-4">
              {customerProducts.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      Produkty klienta
                    </Badge>
                    <span className="text-sm text-muted-foreground">({customerProducts.length})</span>
                  </div>
                  <div className="space-y-2">
                    {customerProducts.map((product) => (
                      <div key={product.id} className="rounded-lg border bg-card p-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{product.name}</p>
                            {product.sku && <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>}
                          </div>
                          <Badge variant="secondary">x{product.quantity}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {displayProducts.length > 0 && (
                <>
                  {customerProducts.length > 0 && <Separator />}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-chart-4/10 text-foreground border-chart-4/20">
                        Produkty wystawowe
                      </Badge>
                      <span className="text-sm text-muted-foreground">({displayProducts.length})</span>
                    </div>
                    <div className="space-y-2">
                      {displayProducts.map((product) => (
                        <div key={product.id} className="rounded-lg border bg-card p-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <p className="font-medium text-foreground">{product.name}</p>
                              {product.sku && <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>}
                            </div>
                            <Badge variant="secondary">x{product.quantity}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </Card>

      {/* Driver Information */}
      <Card>
        <div className="p-4 space-y-4">
          <h3 className="text-lg font-medium text-foreground">Kierowca</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Imię i nazwisko</span>
              <span className="text-sm font-medium text-foreground">{driver.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Numer pojazdu</span>
              <span className="text-sm font-medium text-foreground">{driver.vehicleNumber}</span>
            </div>
            <Separator />
            <Button variant="outline" className="w-full gap-2 bg-transparent">
              <Phone className="h-4 w-4" />
              {driver.phone}
            </Button>
          </div>
        </div>
      </Card>

      {/* Action Button */}
      <Button onClick={onShowChecklist} className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
        <ClipboardList className="h-4 w-4" />
        Otwórz checklistę dostawy
      </Button>
    </div>
  )
}
