"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2 } from "lucide-react"
import type { RentalDuration } from "@/types/admin"

interface RentalDurationsManagerProps {
  durations: RentalDuration[]
  onChange: (durations: RentalDuration[]) => void
}

const AVAILABLE_DURATIONS = [6, 12, 24, 36] as const

export function RentalDurationsManager({ durations, onChange }: RentalDurationsManagerProps) {
  const [selectedDurations, setSelectedDurations] = useState<Set<number>>(new Set(durations.map((d) => d.duration)))

  const toggleDuration = (duration: 6 | 12 | 24 | 36) => {
    const newSelected = new Set(selectedDurations)

    if (newSelected.has(duration)) {
      // Supprimer la durée
      newSelected.delete(duration)
      const newDurations = durations.filter((d) => d.duration !== duration)
      onChange(newDurations)
    } else {
      // Ajouter la durée avec des valeurs par défaut
      newSelected.add(duration)
      const newDurations = [
        ...durations,
        {
          duration,
          monthlyFee: 0,
          upfrontContribution: 0,
        },
      ].sort((a, b) => a.duration - b.duration)
      onChange(newDurations)
    }

    setSelectedDurations(newSelected)
  }

  const updateDuration = (duration: number, field: "monthlyFee" | "upfrontContribution", value: number) => {
    const newDurations = durations.map((d) => (d.duration === duration ? { ...d, [field]: value } : d))
    onChange(newDurations)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Durées de location</CardTitle>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Configurez les prix pour différentes durées de location (tous les prix sont HT)
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sélection des durées */}
        <div>
          <Label className="mb-3 block">Durées disponibles</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {AVAILABLE_DURATIONS.map((duration) => (
              <div key={duration} className="flex items-center space-x-2">
                <Checkbox
                  id={`duration-${duration}`}
                  checked={selectedDurations.has(duration)}
                  onCheckedChange={() => toggleDuration(duration)}
                />
                <Label
                  htmlFor={`duration-${duration}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {duration} mois
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Configuration des prix pour chaque durée sélectionnée */}
        {durations.length > 0 ? (
          <div className="space-y-4">
            <Label className="text-base">Configuration des prix</Label>
            {durations.map((duration) => (
              <Card key={duration.duration}>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-lg">{duration.duration} mois</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleDuration(duration.duration)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor={`monthly-fee-${duration.duration}`}>
                          Loyer mensuel (DH HT) <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id={`monthly-fee-${duration.duration}`}
                          type="number"
                          placeholder="0.00"
                          value={duration.monthlyFee || ""}
                          onChange={(e) => updateDuration(duration.duration, "monthlyFee", Number(e.target.value))}
                          min="0"
                          step="0.01"
                          required
                        />
                        <p className="text-xs text-gray-500">Prix du loyer mensuel hors taxes</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`upfront-${duration.duration}`}>
                          Apport initial (DH HT) <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id={`upfront-${duration.duration}`}
                          type="number"
                          placeholder="0.00"
                          value={duration.upfrontContribution || ""}
                          onChange={(e) =>
                            updateDuration(duration.duration, "upfrontContribution", Number(e.target.value))
                          }
                          min="0"
                          step="0.01"
                          required
                        />
                        <p className="text-xs text-gray-500">Montant de l'apport initial hors taxes</p>
                      </div>
                    </div>

                    {/* Calcul automatique du coût total */}
                    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Coût total HT:</span>
                          <p className="font-semibold text-lg">
                            {(duration.monthlyFee * duration.duration + duration.upfrontContribution).toFixed(2)} DH
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Coût total TTC (TVA 20%):</span>
                          <p className="font-semibold text-lg">
                            {((duration.monthlyFee * duration.duration + duration.upfrontContribution) * 1.2).toFixed(
                              2,
                            )}{" "}
                            DH
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>Sélectionnez au moins une durée de location pour configurer les prix</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
