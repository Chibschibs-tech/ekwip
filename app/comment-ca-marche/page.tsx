import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  ShoppingCart,
  Truck,
  Headphones,
  CheckCircle,
  Clock,
  Shield,
  Users,
  ArrowRight,
  Star,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HowItWorksPage() {
  const steps = [
    {
      number: "01",
      title: "Explorez notre catalogue",
      description:
        "Parcourez notre large gamme d'équipements informatiques professionnels. Ordinateurs portables, desktops, serveurs, et bien plus encore.",
      icon: Search,
      color: "bg-blue-500",
    },
    {
      number: "02",
      title: "Sélectionnez vos équipements",
      description:
        "Choisissez les équipements qui correspondent à vos besoins. Configurez la durée de location et les options supplémentaires.",
      icon: ShoppingCart,
      color: "bg-green-500",
    },
    {
      number: "03",
      title: "Livraison et installation",
      description:
        "Nous livrons et installons vos équipements directement dans vos locaux. Configuration complète incluse.",
      icon: Truck,
      color: "bg-orange-500",
    },
    {
      number: "04",
      title: "Support continu",
      description:
        "Bénéficiez de notre support technique 24/7, maintenance préventive et remplacement en cas de panne.",
      icon: Headphones,
      color: "bg-purple-500",
    },
  ]

  const benefits = [
    {
      icon: Clock,
      title: "Flexibilité totale",
      description: "Louez pour la durée qui vous convient, de quelques mois à plusieurs années.",
    },
    {
      icon: Shield,
      title: "Sécurité garantie",
      description: "Tous nos équipements sont assurés et bénéficient d'une garantie complète.",
    },
    {
      icon: Users,
      title: "Support expert",
      description: "Notre équipe technique vous accompagne tout au long de votre location.",
    },
    {
      icon: CheckCircle,
      title: "Maintenance incluse",
      description: "Maintenance préventive et réparations incluses dans votre contrat de location.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-[#1f3b57] to-[#1f3b57]/80 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-white/20 text-white hover:bg-white/30">Comment ça marche</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Location d'équipements informatiques
            <span className="block text-white/90">simplifiée</span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Découvrez comment Ekwip révolutionne la location d'équipements informatiques pour les entreprises au Maroc
            avec un processus simple et efficace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/catalogue">
              <Button size="lg" className="bg-white text-[#1f3b57] hover:bg-white/90">
                Voir le catalogue
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                Nous contacter
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Un processus simple en 4 étapes</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              De la sélection à l'installation, nous vous accompagnons à chaque étape pour vous garantir une expérience
              sans stress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card
                key={index}
                className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <div
                      className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#1f3b57] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{step.number}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Pourquoi choisir Ekwip ?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nous offrons bien plus qu'une simple location d'équipements. Découvrez tous les avantages de notre
              service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[#1f3b57] rounded-lg flex items-center justify-center">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-6">
              "Ekwip a transformé notre façon de gérer nos équipements informatiques. Service impeccable et support
              réactif !"
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <Image
                src="/placeholder-user.jpg"
                alt="Client satisfait"
                width={60}
                height={60}
                className="rounded-full"
              />
              <div className="text-left">
                <p className="font-semibold text-gray-900">Ahmed Benali</p>
                <p className="text-gray-600">Directeur IT, TechCorp</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-[#1f3b57] to-[#1f3b57]/80 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à commencer ?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Rejoignez des centaines d'entreprises qui font confiance à Ekwip pour leurs besoins en équipements
            informatiques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/catalogue">
              <Button size="lg" className="bg-white text-[#1f3b57] hover:bg-white/90">
                Explorer le catalogue
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                Demander un devis
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
