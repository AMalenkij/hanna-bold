import Link from "next/link"

export default function Footer() {
  return (
    <footer className="fixed bg-red-500 text-white py-16 px-6 w-full bottom-0">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Reach out */}
          <div className="space-y-4">
            <div className="text-sm opacity-80">/ Reach out</div>
            <Link 
              href="mailto:hannabandgd@gmail.com" 
              className="block hover:opacity-80 transition-opacity"
            >
              hannabandgd@gmail.com
            </Link>
          </div>

          {/* Find us */}
          <div className="space-y-4">
            <div className="text-sm opacity-80">/ Find us</div>
            <address className="not-italic">
              Somewhere in Gdansk<br />
              Poland
            </address>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <div className="text-sm opacity-80">/ Social</div>
            <nav className="flex flex-col space-y-2">
              <Link href="#" className="hover:opacity-80 transition-opacity">spotify</Link>
              <Link href="#" className="hover:opacity-80 transition-opacity">facebook</Link>
              <Link href="#" className="hover:opacity-80 transition-opacity">youtube</Link>
              <Link href="#" className="hover:opacity-80 transition-opacity">instagram</Link>
            </nav>
          </div>

          {/* Nav */}
          <div className="space-y-4">
            <div className="text-sm opacity-80">/ Nav</div>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="hover:opacity-80 transition-opacity">Home</Link>
              <Link href="/news" className="hover:opacity-80 transition-opacity">News</Link>
              <Link href="/about" className="hover:opacity-80 transition-opacity">About</Link>
              <Link href="/concerts" className="hover:opacity-80 transition-opacity">Concerts</Link>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-white/20 text-sm opacity-80">
          ©2022 HANNA ROCK BAND / <Link href="/credits" className="hover:opacity-80 transition-opacity">SITE CREDITS</Link>
        </div>
      </div>
    </footer>
  )
}

