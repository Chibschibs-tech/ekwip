"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Paperclip, Send } from "lucide-react"
import Link from "next/link"

export default function TicketDetailPage({ params }: { params: { id: string } }) {
  const ticketId = params.id
  const [newMessage, setNewMessage] = useState("")
  const [sending, setSending] = useState(false)

  // Mock ticket data
  const ticket = {
    id: ticketId,
    subject: "Problème de démarrage MacBook Pro",
    equipment: "MacBook Pro 14 (EQ-2023-001)",
    date: "2023-06-10",
    status: "in_progress",
    priority: "high",
    description:
      "Le MacBook Pro ne démarre plus correctement. L'écran reste noir après avoir appuyé sur le bouton d'alimentation, mais on peut entendre le ventilateur tourner. J'ai essayé de réinitialiser la PRAM et la SMC, mais le problème persiste.",
    messages: [
      {
        id: 1,
        sender: {
          name: "John Doe",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "client",
        },
        date: "2023-06-10 14:30",
        content:
          "Bonjour, mon MacBook Pro ne démarre plus correctement. L'écran reste noir après avoir appuyé sur le bouton d'alimentation, mais on peut entendre le ventilateur tourner. J'ai essayé de réinitialiser la PRAM et la SMC, mais le problème persiste.",
        attachments: [],
      },
      {
        id: 2,
        sender: {
          name: "Support Ekwip",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "support",
        },
        date: "2023-06-10 15:45",
        content:
          "Bonjour John, merci pour votre message. Pouvez-vous essayer de connecter votre MacBook à un écran externe pour voir si l'affichage fonctionne ? Cela nous aidera à déterminer s'il s'agit d'un problème d'écran ou d'un problème plus général.",
        attachments: [],
      },
      {
        id: 3,
        sender: {
          name: "John Doe",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "client",
        },
        date: "2023-06-11 09:15",
        content:
          "J'ai essayé de connecter le MacBook à un écran externe, mais rien ne s'affiche. J'ai également essayé de démarrer en mode sans échec (touche Shift enfoncée), mais cela ne fonctionne pas non plus.",
        attachments: [],
      },
      {
        id: 4,
        sender: {
          name: "Support Ekwip",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "support",
        },
        date: "2023-06-11 10:30",
        content:
          "Merci pour ces informations supplémentaires. Il semble que nous ayons affaire à un problème matériel plus sérieux. Nous allons organiser un enlèvement de votre MacBook pour diagnostic et réparation. Pouvez-vous nous confirmer votre disponibilité pour la collecte dans les prochains jours ?",
        attachments: [],
      },
    ],
  }

  // Format date to local format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  // Render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Ouvert</Badge>
      case "in_progress":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">En cours</Badge>
      case "resolved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Résolu</Badge>
      case "closed":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Fermé</Badge>
      default:
        return null
    }
  }

  // Render priority badge
  const renderPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Haute</Badge>
      case "medium":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Moyenne</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Basse</Badge>
      default:
        return null
    }
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    setSending(true)

    // Simulate sending message
    setTimeout(() => {
      setSending(false)
      setNewMessage("")
      // Here you would typically update the ticket messages with the new message
    }, 1000)
  }

  return (
    <div>
      <div className="mb-8">
        <Link href="/portail-client/tickets" className="inline-flex items-center text-[#1f3b57] hover:underline mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Retour aux tickets
        </Link>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Ticket {ticket.id} {renderStatusBadge(ticket.status)}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{ticket.subject}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {ticket.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender.role === "client" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex max-w-[80%] ${message.sender.role === "client" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <Avatar className={`h-10 w-10 ${message.sender.role === "client" ? "ml-4" : "mr-4"}`}>
                      <AvatarImage src={message.sender.avatar || "/placeholder.svg"} alt={message.sender.name} />
                      <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div
                      className={`rounded-lg p-4 ${message.sender.role === "client" ? "bg-[#1f3b57] text-white" : "bg-gray-100 text-gray-800"}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{message.sender.name}</span>
                        <span className="text-xs opacity-70">{formatDate(message.date)}</span>
                      </div>
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      {message.attachments.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <p className="text-sm font-medium mb-1">Pièces jointes:</p>
                          <div className="flex flex-wrap gap-2">
                            {message.attachments.map((attachment, index) => (
                              <div
                                key={index}
                                className="flex items-center rounded-md bg-white px-2 py-1 text-xs text-gray-800"
                              >
                                <Paperclip className="h-3 w-3 mr-1" />
                                <span>{attachment}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-gray-200">
              <div className="space-y-4">
                <Textarea
                  placeholder="Écrivez votre message ici..."
                  className="min-h-[120px]"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <div className="flex justify-between items-center">
                  <Button variant="outline" type="button">
                    <Paperclip className="h-4 w-4 mr-2" />
                    Ajouter une pièce jointe
                  </Button>
                  <Button type="button" onClick={handleSendMessage} disabled={!newMessage.trim() || sending}>
                    {sending ? "Envoi en cours..." : "Envoyer"}
                    {!sending && <Send className="h-4 w-4 ml-2" />}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Détails du ticket</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Statut</dt>
                <dd className="mt-1">{renderStatusBadge(ticket.status)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Priorité</dt>
                <dd className="mt-1">{renderPriorityBadge(ticket.priority)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Date de création</dt>
                <dd className="mt-1 text-sm text-gray-900">{formatDate(ticket.date)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Équipement concerné</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <Link
                    href={`/portail-client/equipment/${ticket.equipment.split(" ")[2].replace(/[()]/g, "")}`}
                    className="text-[#1f3b57] hover:underline"
                  >
                    {ticket.equipment}
                  </Link>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Description</dt>
                <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{ticket.description}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
