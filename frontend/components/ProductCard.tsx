"use client"
import Image from "next/image"
import { useCart } from "@/context/CartContext"
import { useState, useRef } from "react"

interface ProductCardProps {
    id: number,
    name: string,
    price: number,
    imageUrl: string,
    description: string,
    category: string,
    stock: number,
    rating: number,
    numReviews: number

}
export default function ProductCard({ id, name, price, imageUrl }: ProductCardProps) {
    const { addToCart } = useCart()
    const [clickCount, setClickCount] = useState(0)
    const [isBlocked, setIsBlocked] = useState(false)
    const [isAdded, setIsAdded] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    const handleAddToCart = () => {
        if (isBlocked) return

        // seccion para que no haga mas de 5 clicks en un mismo producto
        setClickCount(prev => {
            const newCount = prev + 1

            if (timeoutRef.current) clearTimeout(timeoutRef.current)
            timeoutRef.current = setTimeout(() => setClickCount(0), 2000)

            if (newCount > 5) {
                setIsBlocked(true)
                setTimeout(() => {
                    setIsBlocked(false)
                    setClickCount(0)
                }, 3000)
                return newCount
            }

            addToCart({ id, name, price, imageUrl })


            setIsAdded(true)
            setTimeout(() => setIsAdded(false), 1000)

            return newCount
        })
    }

    return (
        <div>
            <div className="border p-4 rounded-2xl shadow hover:shadow-lg transition w-full max-w-[310px] mx-auto bg-white dark:bg-zinc-900 dark:border-zinc-800">
                <div className="relative w-full h-48 mb-4">
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className="object-contain p-2 rounded"
                    />
                </div>

                <h3 className="font-bold text-lg line-clamp-1" title={name}>{name}</h3>
                <p className="text-green-600 font-bold">₲ {price}</p>

                <button
                    onClick={handleAddToCart}
                    disabled={isBlocked}
                    className={`mt-2 w-full py-2 rounded transition-colors cursor-pointer ${isBlocked
                        ? "bg-red-500 hover:bg-red-600 text-white cursor-not-allowed"
                        : isAdded
                            ? "bg-green-600 text-white"
                            : "bg-sky-800 hover:bg-sky-900 text-white"
                        }`}
                >
                    {isBlocked ? "Espere un momento..." : isAdded ? "Agregado!" : "Agregar +"}
                </button>
            </div>

        </div>
    )
}
