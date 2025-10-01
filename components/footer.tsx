import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div>
          <h3 className="mb-4 text-lg font-semibold">À propos</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="text-gray-400 transition-colors hover:text-white">
                Notre équipe
              </Link>
            </li>
            <li>
              <Link href="/history" className="text-gray-400 transition-colors hover:text-white">
                Histoire
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Services</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/services/design" className="text-gray-400 transition-colors hover:text-white">
                Design
              </Link>
            </li>
            <li>
              <Link href="/services/development" className="text-gray-400 transition-colors hover:text-white">
                Développement
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Contact</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/contact" className="text-gray-400 transition-colors hover:text-white">
                Nous contacter
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Administration</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/admin" className="text-gray-400 transition-colors hover:text-white">
                Panneau Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
