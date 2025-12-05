"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Search, Check, Mail, Phone } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

export default function AssignEquipmentPage({ params }: { params: { id: string } }) {
  const equipmentId = params.id
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  // Mock equipment data
  const equipment = {
    id: equipmentId,
    name: 'MacBook Pro 16"',
    type: "Ordinateur portable",
    model: 'MacBook Pro 16" 2023',
    serialNumber: "FVFG87654HGFD",
    status: "Actif",
    currentlyAssignedTo: {
      id: "USR-001",
      name: "John Doe",
      email: "john.doe@acme.com",
      department: "Marketing",
      phone: "+212 6XX XX XX XX",
    },
  }

  // Mock users data
  const users = [
    {
      id: "USR-001",
      name: "John Doe",
      email: "john.doe@acme.com",
      department: "Marketing",
      phone: "+212 6XX XX XX XX",
      isCurrentlyAssigned: true,
    },
    {
      id: "USR-002",
      name: "Sarah Johnson",
      email: "sarah.johnson@acme.com",
      department: "Finance",
      phone: "+212 6XX XX XX XX",
      isCurrentlyAssigned: false,
    },
    {
      id: "USR-003",
      name: "Michael Brown",
      email: "michael.brown@acme.com",
      department: "Ventes",
      phone: "+212 6XX XX XX XX",
      isCurrentlyAssigned: false,
    },
    {
      id: "USR-004",
      name: "Emily Davis",
      email: "emily.davis@acme.com",
      department: "Design",
      phone: "+212 6XX XX XX XX",
      isCurrentlyAssigned: false,
    },
    {
      id: "USR-006",
      name: "Jennifer Lee",
      email: "jennifer.lee@acme.com",
      department: "Ventes",
      phone: "+212 6XX XX XX XX",
      isCurrentlyAssigned: false,
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      router.push(`/portail-client/equipment/${equipmentId}`)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" className="mr-2" asChild>
          <Link href={`/portail-client/equipment/${equipmentId}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Assigner l'équipement</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Equipment details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Détails de l'équipement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <Avatar className="h-12 w-12 mr-4">
                <AvatarImage src="/placeholder.svg" alt={equipment.name} />
                <AvatarFallback>{equipment.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center">
                  <h2 className="font-semibold">{equipment.name}</h2>
                  <Badge variant="outline" className="ml-2 bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                    {equipment.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{equipment.model}</p>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">ID</span>
                <span className="text-sm font-medium">{equipment.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Type</span>
                <span className="text-sm font-medium">{equipment.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Numéro de série</span>
                <span className="text-sm font-medium">{equipment.serialNumber}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current assignment */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Assignation actuelle</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Avatar className="h-12 w-12 mr-4">
                <AvatarImage src="/placeholder.svg" alt={equipment.currentlyAssignedTo.name} />
                <AvatarFallback>{equipment.currentlyAssignedTo.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{equipment.currentlyAssignedTo.name}</p>
                <p className="text-sm text-muted-foreground">{equipment.currentlyAssignedTo.department}</p>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="space-y-2">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{equipment.currentlyAssignedTo.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{equipment.currentlyAssignedTo.phone}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assignment form */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg">Assigner à un utilisateur</CardTitle>
            <CardDescription>Sélectionnez l'utilisateur à qui vous souhaitez assigner cet équipement</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="search" placeholder="Rechercher un utilisateur..." className="w-full pl-8" />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px] ml-2">
                        <SelectValue placeholder="Département" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les départements</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="sales">Ventes</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <RadioGroup
                    defaultValue={equipment.currentlyAssignedTo.id}
                    onValueChange={setSelectedUser}
                    className="space-y-3"
                  >
                    {users.map((user) => (
                      <div
                        key={user.id}
                        className={`flex items-center space-x-2 rounded-md border p-4 ${
                          selectedUser === user.id ? "border-ekwip bg-ekwip-50" : ""
                        }`}
                      >
                        <RadioGroupItem value={user.id} id={user.id} />
                        <Label htmlFor={user.id} className="flex-1 cursor-pointer">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-4">
                              <AvatarImage src="/placeholder.svg" alt={user.name} />
                              <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center">
                                <p className="font-medium">{user.name}</p>
                                {user.isCurrentlyAssigned && <Badge className="ml-2">Assigné actuellement</Badge>}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <span>{user.department}</span>
                                <span className="mx-2">•</span>
                                <span>{user.email}</span>
                              </div>
                            </div>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (optionnel)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Ajoutez des notes concernant cette assignation..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Annuler
                </Button>
                <Button type="submit" className="bg-ekwip hover:bg-ekwip-700" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>Assignation en cours...</>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Confirmer l'assignation
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
