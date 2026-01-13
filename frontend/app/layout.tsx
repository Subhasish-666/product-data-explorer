'use client'

import './globals.css'
import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">

        {/* ---------- Navbar ---------- */}
        <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur border-b border-white/10">
          <nav className="max-w-7xl mx-auto flex items-center justify-between p-6">

            {/* Desktop menu */}
            <div className="hidden lg:flex gap-10">
              {navigation.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </nav>
        </header>

        {/* ---------- Page content ---------- */}
        <main className="max-w-7xl mx-auto px-6 py-10">
          {children}
        </main>
      </body>
    </html>
  )
}
