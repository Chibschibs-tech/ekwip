"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { X } from "lucide-react"
import type { RentalDuration } from "@/types/admin"

interface RentalDurationsManagerProps {
  durations: RentalDuration[]
  onChange: (durations: RentalDuration[]) => void
}

const AVAILABLE_DURATIONS = [6, 12, 24, 36] as const
const TAX_RATE = 0.2 // 20% TVA

export function RentalDurationsManager({ durations, onChange }: RentalDurationsManagerProps) {
  const [selectedDurations, setSelectedDurations] = useState<Set<number>>(new Set(durations.map((d) => d.duration)))

  const handleDurationToggle = (duration: 6 | 12 | 24 | 36) => {
    const newSelected = new Set(selectedDurations)

    if (newSelected.has(duration)) {
      newSelected.delete(duration)
      onChange(durations.filter((d) => d.duration !== duration))
    } else {
      newSelected.add(duration)
      const newDuration: RentalDuration = {
        duration,
        monthlyFee: 0,
        upfrontContribution: 0,
      }
      onChange([...durations, newDuration])
    }

    setSelectedDurations(newSelected)
  }

  const updateDuration = (duration: 6 | 12 | 24 | 36, field: keyof RentalDuration, value: number) => {
    const newDurations = durations.map((d) => (d.duration === duration ? { ...d, [field]: value } : d))
    onChange(newDurations)
  }

  const getDuration = (duration: 6 | 12 | 24 | 36) => {
    return durations.find((d) => d.duration === duration)
  }

  const calculateTotal = (monthlyFee: number, upfront: number, months: number) => {
    const totalHT = monthlyFee * months + upfront
    const totalTTC = totalHT * (1 + TAX_RATE)
    return { totalHT, totalTTC }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tarification par durée de location</CardTitle>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Définissez les tarifs pour différentes durées de location (tous les prix sont HT)
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label>Durées disponibles</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {AVAILABLE_DURATIONS.map((duration) => (
              <div key={duration} className="flex items-center space-x-2">
                <Checkbox
                  id={`duration-${duration}`}
                  checked={selectedDurations.has(duration)}
                  onCheckedChange={() => handleDurationToggle(duration)}
                />
                <label
                  htmlFor={`duration-${duration}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {duration} mois
                </label>
              </div>
            ))}
          </div>
        </div>

        {durations.length > 0 && (
          <div className="space-y-4">
            <Label>Configuration des tarifs</Label>
            <div className="space-y-4">
              {AVAILABLE_DURATIONS.filter((d) => selectedDurations.has(d)).map((duration) => {
                const config = getDuration(duration)
                if (!config) return null

                const { totalHT, totalTTC } = calculateTotal(config.monthlyFee, config.upfrontContribution, duration)

                return (
                  <Card key={duration}>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-lg">{duration} mois</h4>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDurationToggle(duration)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor={`monthly-${duration}`}>
                              Loyer mensuel (DH HT) <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id={`monthly-${duration}`}
                              type="number"
                              placeholder="Ex: 450"
                              value={config.monthlyFee || ""}
                              onChange={(e) => updateDuration(duration, "monthlyFee", Number(e.target.value))}
                              min="0"
                              step="0.01"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`upfront-${duration}`}>Apport initial (DH HT)</Label>
                            <Input
                              id={`upfront-${duration}`}
                              type="number"
                              placeholder="Ex: 500"
                              value={config.upfrontContribution || ""}
                              onChange={(e) => updateDuration(duration, "upfrontContribution", Number(e.target.value))}
                              min="0"
                              step="0.01"
                            />
                          </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Loyer total ({duration} mois)</span>
                            <span className="font-medium">{(config.monthlyFee * duration).toFixed(2)} DH HT</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Apport initial</span>
                            <span className="font-medium">{config.upfrontContribution.toFixed(2)} DH HT</span>
                          </div>
                          <div className="h-px bg-gray-300 dark:bg-gray-600" />
                          <div className="flex justify-between text-sm font-semibold">
                            <span>Coût total HT</span>
                            <span>{totalHT.toFixed(2)} DH HT</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">TVA 20%</span>
                            <span className="font-medium">{(totalTTC - totalHT).toFixed(2)} DH</span>
                          </div>
                          <div className="flex justify-between font-bold text-blue-600">
                            <span>Coût total TTC</span>
                            <span>{totalTTC.toFixed(2)} DH TTC</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {durations.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>Sélectionnez au moins une durée pour configurer les tarifs</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
