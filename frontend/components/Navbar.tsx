"use client"

import Link from "next/link"
import { useState } from "react"
import { ThemeToggle } from "./ThemeToggle"
import { useCart } from "@/context/CartContext"

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { toggleCart, totalItems } = useCart()

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-black/95 backdrop-blur supports-backdrop-filter:bg-white/60 dark:supports-backdrop-filter:bg-black/60">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
                            ECOMMERCE
                        </Link>
                    </div>

                    {/* navegacion desktop */}
                    <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
                        <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            Inicio
                        </Link>
                        <Link href="/shop" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            Productos
                        </Link>
                        <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            Sobre Nosotros
                        </Link>
                    </div>

                    {/* derecha (carrito y menu movil) */}
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <button
                            onClick={toggleCart}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors relative"
                            aria-label="Cart"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="8" cy="21" r="1" />
                                <circle cx="19" cy="21" r="1" />
                                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                            </svg>
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-sky-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                    {totalItems}
                                </span>
                            )}
                        </button>

                        {/* Movil Menu botones */}
                        <button
                            className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="4" x2="20" y1="12" y2="12" />
                                    <line x1="4" x2="20" y1="6" y2="6" />
                                    <line x1="4" x2="20" y1="18" y2="18" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Movil Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t">
                        <div className="flex flex-col space-y-4 text-sm font-medium">
                            <Link
                                href="/"
                                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/shop"
                                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Productos
                            </Link>
                            <Link
                                href="/about"
                                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                About
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
