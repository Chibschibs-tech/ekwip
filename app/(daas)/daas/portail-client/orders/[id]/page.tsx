import Link from "next/link"
import {
  ArrowLeft,
  Package,
  Calendar,
  CreditCard,
  Truck,
  CheckCircle,
  Clock,
  Download,
  Printer,
  MessageSquare,
  Phone,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const orderId = params.id

  // Mock order data
  const order = {
    id: orderId,
    date: "15 Oct 2023",
    status: "En cours",
    paymentStatus: "Payé",
    paymentMethod: "Carte bancaire",
    paymentDate: "15 Oct 2023",
    deliveryDate: "Prévu le 22 Oct 2023",
    deliveryAddress: "123 Rue des Entreprises, Casablanca, Maroc",
    contactPerson: "John Doe",
    contactPhone: "+212 6XX XX XX XX",
    contactEmail: "john.doe@acme.com",
    items: [
      {
        id: "ITEM-001",
        name: "Dell XPS 15",
        description: "Intel Core i7, 16GB RAM, 512GB SSD",
        quantity: 1,
        price: "1,500 MAD/mois",
        duration: "12 mois",
        total: "18,000 MAD",
      },
      {
        id: "ITEM-002",
        name: "Surface Pro 9",
        description: "Intel Core i5, 8GB RAM, 256GB SSD",
        quantity: 2,
        price: "1,300 MAD/mois",
        duration: "12 mois",
        total: "31,200 MAD",
      },
    ],
    subtotal: "2,800 MAD/mois",
    tax: "560 MAD/mois",
    total: "3,360 MAD/mois",
    contractTotal: "40,320 MAD",
    notes: "Livraison à effectuer pendant les heures de bureau (9h-17h)",
  }

  // Order timeline
  const timeline = [
    { date: "15 Oct 2023, 10:23", status: "Commande confirmée", icon: CheckCircle, color: "text-emerald-500" },
    { date: "15 Oct 2023, 14:45", status: "Paiement reçu", icon: CreditCard, color: "text-blue-500" },
    { date: "17 Oct 2023, 09:12", status: "En préparation", icon: Package, color: "text-amber-500" },
    { date: "19 Oct 2023, 11:30", status: "En cours de livraison", icon: Truck, color: "text-indigo-500" },
    { date: "22 Oct 2023", status: "Livraison prévue", icon: Clock, color: "text-gray-500" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="mr-2" asChild>
            <Link href="/portail-client/orders">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Commande {orderId}</h1>
            <p className="text-muted-foreground">Passée le {order.date}</p>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Imprimer
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Télécharger
          </Button>
          <Button size="sm" className="bg-ekwip hover:bg-ekwip-700">
            <MessageSquare className="mr-2 h-4 w-4" />
            Contacter le support
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Order status */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Statut de la commande</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <div>
                <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                  {order.status}
                </Badge>
                <p className="mt-2 text-sm text-muted-foreground">
                  Livraison prévue le {order.deliveryDate.replace("Prévu le ", "")}
                </p>
              </div>
              <div>
                <Badge variant="outline" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                  {order.paymentStatus}
                </Badge>
                <p className="mt-2 text-sm text-muted-foreground">
                  {order.paymentMethod} • {order.paymentDate}
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              {timeline.map((item, i) => (
                <div key={i} className="flex mb-6 last:mb-0">
                  <div className="flex flex-col items-center mr-4">
                    <div className={`rounded-full p-1 ${i < 4 ? "bg-white" : "bg-gray-100"}`}>
                      <item.icon className={`h-5 w-5 ${item.color}`} />
                    </div>
                    {i < timeline.length - 1 && <div className="w-px h-full bg-gray-200 mt-1" />}
                  </div>
                  <div>
                    <p className="font-medium">{item.status}</p>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Résumé</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sous-total</span>
                <span>{order.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">TVA (20%)</span>
                <span>{order.tax}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total mensuel</span>
                <span>{order.total}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total contrat (12 mois)</span>
                <span className="text-muted-foreground">{order.contractTotal}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Statut du paiement</span>
                <Badge variant="outline" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                  {order.paymentStatus}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Méthode de paiement</span>
                <span>{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Date de paiement</span>
                <span>{order.paymentDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order items */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Équipements commandés</CardTitle>
          <CardDescription>Liste des équipements inclus dans cette commande</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Équipement</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-center">Quantité</TableHead>
                <TableHead className="text-right">Prix unitaire</TableHead>
                <TableHead className="text-right">Durée</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="/placeholder.svg" alt={item.name} />
                        <AvatarFallback>{item.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      {item.name}
                    </div>
                  </TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className="text-center">{item.quantity}</TableCell>
                  <TableCell className="text-right">{item.price}</TableCell>
                  <TableCell className="text-right">{item.duration}</TableCell>
                  <TableCell className="text-right">{item.total}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={5}></TableCell>
                <TableCell className="text-right font-medium">Sous-total</TableCell>
                <TableCell className="text-right">{order.subtotal}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={5}></TableCell>
                <TableCell className="text-right font-medium">TVA (20%)</TableCell>
                <TableCell className="text-right">{order.tax}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={5}></TableCell>
                <TableCell className="text-right font-medium">Total mensuel</TableCell>
                <TableCell className="text-right font-bold">{order.total}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Delivery information */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informations de livraison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <Truck className="h-5 w-5 mr-2 text-muted-foreground" />
                <div>
                  <p className="font-medium">Adresse de livraison</p>
                  <p className="text-muted-foreground">{order.deliveryAddress}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                <div>
                  <p className="font-medium">Date de livraison</p>
                  <p className="text-muted-foreground">{order.deliveryDate}</p>
                </div>
              </div>
              <div className="flex items-start">
                <MessageSquare className="h-5 w-5 mr-2 text-muted-foreground" />
                <div>
                  <p className="font-medium">Notes</p>
                  <p className="text-muted-foreground">{order.notes}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-4">
                  <AvatarImage src="/placeholder.svg" alt={order.contactPerson} />
                  <AvatarFallback>{order.contactPerson.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{order.contactPerson}</p>
                  <p className="text-sm text-muted-foreground">Personne de contact</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center">
                  <Package className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Acme Inc.</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{order.contactEmail}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{order.contactPhone}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
