"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle2, Circle, Clock } from "lucide-react"
import type { Order } from "@/lib/types"
import { deliverySteps } from "@/lib/mock-data"
import type { DeliveryStep } from "@/lib/types"

interface DeliveryChecklistProps {
  order: Order
  onBack: () => void
}

export function DeliveryChecklist({ order, onBack }: DeliveryChecklistProps) {
  const [steps, setSteps] = useState<DeliveryStep[]>(deliverySteps)

  const handleStepClick = (stepId: string) => {
    setSteps((prevSteps) => {
      const stepIndex = prevSteps.findIndex((s) => s.id === stepId)
      if (stepIndex === -1) return prevSteps

      const currentStep = prevSteps[stepIndex]

      // Don't allow clicking completed steps
      if (currentStep.status === "completed") return prevSteps

      // Check if previous steps are completed
      const previousStepsCompleted = prevSteps.slice(0, stepIndex).every((s) => s.status === "completed")

      if (!previousStepsCompleted && currentStep.status !== "in-progress") {
        return prevSteps
      }

      const newSteps = [...prevSteps]

      if (currentStep.status === "pending") {
        // Mark as in-progress
        newSteps[stepIndex] = {
          ...currentStep,
          status: "in-progress",
        }
      } else if (currentStep.status === "in-progress") {
        // Mark as completed
        const now = new Date()
        newSteps[stepIndex] = {
          ...currentStep,
          status: "completed",
          timestamp: `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`,
          confirmedBy: "Jan Kowalski",
        }

        // Mark next step as in-progress if exists
        if (stepIndex + 1 < newSteps.length) {
          newSteps[stepIndex + 1] = {
            ...newSteps[stepIndex + 1],
            status: "in-progress",
          }
        }
      }

      return newSteps
    })
  }

  const completedSteps = steps.filter((s) => s.status === "completed").length
  const progress = (completedSteps / steps.length) * 100

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Powrót do szczegółów
      </Button>

      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">Checklista dostawy</h2>
        <p className="text-sm text-muted-foreground">
          {order.storeName} • {order.orderNumber}
        </p>
      </div>

      {/* Progress Card */}
      <Card>
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Postęp dostawy</span>
            <span className="text-sm text-muted-foreground">
              {completedSteps} / {steps.length}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </Card>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1
          const isClickable =
            step.status !== "completed" &&
            (step.status === "in-progress" || (index > 0 && steps[index - 1].status === "completed") || index === 0)

          return (
            <div key={step.id} className="relative">
              <Card
                className={`transition-all ${isClickable ? "cursor-pointer hover:shadow-md" : "opacity-60"}`}
                onClick={() => isClickable && handleStepClick(step.id)}
              >
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="shrink-0 pt-0.5">
                      {step.status === "completed" ? (
                        <CheckCircle2 className="h-6 w-6 text-primary" />
                      ) : step.status === "in-progress" ? (
                        <Clock className="h-6 w-6 text-chart-4" />
                      ) : (
                        <Circle className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-medium text-foreground">{step.label}</h3>
                        {step.status === "completed" && (
                          <Badge className="bg-primary/10 text-primary border-primary/20" variant="outline">
                            Zakończone
                          </Badge>
                        )}
                        {step.status === "in-progress" && (
                          <Badge className="bg-chart-4/10 text-foreground border-chart-4/20" variant="outline">
                            W trakcie
                          </Badge>
                        )}
                      </div>

                      {step.timestamp && (
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p>Czas: {step.timestamp}</p>
                          {step.confirmedBy && <p>Potwierdzone przez: {step.confirmedBy}</p>}
                        </div>
                      )}

                      {step.status === "in-progress" && (
                        <p className="text-sm text-muted-foreground">Kliknij, aby oznaczyć jako zakończone</p>
                      )}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Connector Line */}
              {!isLast && <div className="absolute left-[2.25rem] top-[4.5rem] h-3 w-0.5 bg-border" />}
            </div>
          )
        })}
      </div>

      {/* Summary Card */}
      {completedSteps === steps.length && (
        <Card className="border-primary/20 bg-primary/5">
          <div className="p-4 text-center space-y-2">
            <CheckCircle2 className="h-12 w-12 text-primary mx-auto" />
            <h3 className="text-lg font-semibold text-foreground">Dostawa zakończona!</h3>
            <p className="text-sm text-muted-foreground">Wszystkie etapy dostawy zostały pomyślnie ukończone.</p>
          </div>
        </Card>
      )}

      {/* Order Summary */}
      <Card>
        <div className="p-4 space-y-3">
          <h3 className="text-lg font-medium text-foreground">Podsumowanie zamówienia</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Adres</span>
              <span className="font-medium text-foreground text-right">
                {order.address}, {order.city}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Liczba produktów</span>
              <span className="font-medium text-foreground">{order.products.length}</span>
            </div>
            {order.estimatedTime && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Szacowany czas</span>
                <span className="font-medium text-foreground">{order.estimatedTime}</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
