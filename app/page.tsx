"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { DeliveriesList } from "@/components/deliveries-list"
import { OrderDetails } from "@/components/order-details"
import { DeliveryChecklist } from "@/components/delivery-checklist"
import { mockRoute } from "@/lib/mock-data"
import type { Order } from "@/lib/types"

type View = "list" | "details" | "checklist"

export default function Home() {
  const [currentView, setCurrentView] = useState<View>("list")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const handleOrderSelect = (order: Order) => {
    setSelectedOrder(order)
    setCurrentView("details")
  }

  const handleShowChecklist = () => {
    setCurrentView("checklist")
  }

  const handleBackToList = () => {
    setCurrentView("list")
    setSelectedOrder(null)
  }

  const handleBackToDetails = () => {
    setCurrentView("details")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6">
        {currentView === "list" && <DeliveriesList route={mockRoute} onOrderSelect={handleOrderSelect} />}
        {currentView === "details" && selectedOrder && (
          <OrderDetails
            order={selectedOrder}
            driver={mockRoute.driver}
            onBack={handleBackToList}
            onShowChecklist={handleShowChecklist}
          />
        )}
        {currentView === "checklist" && selectedOrder && (
          <DeliveryChecklist order={selectedOrder} onBack={handleBackToDetails} />
        )}
      </main>
    </div>
  )
}
