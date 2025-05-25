import type React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { fetchClientLogos } from "@/lib/wordpress-api"

interface ClientLogo {
  id: number
  title: string
  url: string
}

const ClientLogoSlider: React.FC = () => {
  const clientLogos: ClientLogo[] = fetchClientLogos()

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div className="client-logo-slider">
      <Slider {...settings}>
        {clientLogos.map((logo) => (
          <div key={logo.id} className="client-logo-item">
            <img
              src={logo.url || "/placeholder.svg"}
              alt={logo.title}
              style={{ maxWidth: "150px", maxHeight: "50px", margin: "auto" }}
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default ClientLogoSlider
