"use client"

import { useEffect, useRef } from "react"
import type { Order } from "@/lib/types"

interface RouteMapProps {
  orders: Order[]
  driverLocation: [number, number]
  selectedOrder?: Order
}

export function RouteMap({ orders, driverLocation, selectedOrder }: RouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return

    // Dynamically import Leaflet
    import("leaflet").then((L) => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
      }

      // Initialize map
      const map = L.map(mapRef.current).setView(driverLocation, 7)
      mapInstanceRef.current = map

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map)

      // Custom icons
      const driverIcon = L.divIcon({
        html: `<div style="background: #E74C3C; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        className: "",
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })

      const storeIcon = L.divIcon({
        html: `<div style="background: #3B82F6; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        className: "",
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      })

      const selectedStoreIcon = L.divIcon({
        html: `<div style="background: #10B981; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        className: "",
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })

      // Add driver marker
      L.marker(driverLocation, { icon: driverIcon }).addTo(map).bindPopup("<b>Kierowca</b><br>Aktualna lokalizacja")

      // Add store markers
      const bounds: [number, number][] = [driverLocation]
      orders.forEach((order) => {
        const isSelected = selectedOrder?.id === order.id
        const icon = isSelected ? selectedStoreIcon : storeIcon

        L.marker(order.coordinates, { icon }).addTo(map).bindPopup(`<b>${order.storeName}</b><br>${order.address}`)

        bounds.push(order.coordinates)
      })

      // Fit map to show all markers
      if (bounds.length > 1) {
        map.fitBounds(bounds, { padding: [50, 50] })
      }
    })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [orders, driverLocation, selectedOrder])

  return <div ref={mapRef} className="h-full w-full" />
}
